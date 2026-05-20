import { useState, useEffect } from 'react'
import {
  TrendingUp, TrendingDown, Plus, Settings2,
  Headphones, Users, GripVertical, LayoutDashboard,
  Eye, EyeOff, Maximize2, Minimize2,
} from 'lucide-react'
import {
  DndContext, closestCenter, PointerSensor,
  useSensor, useSensors, DragOverlay,
  type DragStartEvent, type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext, rectSortingStrategy,
  useSortable, arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface KpiMetric { label: string; value: string | number; trend: number }
interface KpiGroup   { id: string; title: string; metrics: KpiMetric[] }

const DEFAULT_GROUPS: KpiGroup[] = [
  {
    id: 'cx-health', title: 'Customer Experience',
    metrics: [
      { label: 'CSAT Score',   value: '4.2 / 5', trend:  5 },
      { label: 'FCR Rate',     value: '68%',      trend:  4 },
      { label: 'NPS',          value: 42,         trend:  8 },
      { label: 'SLA Breaches', value: 2,          trend: -12 },
    ],
  },
  {
    id: 'queue', title: 'Queue Health',
    metrics: [
      { label: 'Open',           value: 56,       trend: -3 },
      { label: 'Unassigned',     value: 3,        trend: -8 },
      { label: 'Waiting > 30m', value: 8,        trend: -5 },
      { label: 'Resolved Today', value: 66,       trend:  5 },
    ],
  },
  {
    id: 'response', title: 'Response & Handling',
    metrics: [
      { label: 'Avg. First Response', value: '4m 12s', trend:  6 },
      { label: 'Avg. Handle Time',    value: '8m 45s', trend: -3 },
      { label: 'Reopen Rate',         value: '6%',     trend: -2 },
      { label: 'Escalations',         value: 4,        trend: -9 },
    ],
  },
  {
    id: 'team', title: 'Team',
    metrics: [
      { label: 'Online Agents',  value: '14 / 28', trend:  8 },
      { label: 'Attendance',     value: '75%',     trend:  3 },
      { label: 'Overdue Tasks',  value: 2,         trend: -1 },
      { label: 'High Priority',  value: 8,         trend: -3 },
    ],
  },
  {
    id: 'calls', title: 'Calls & Voice',
    metrics: [
      { label: 'Missed Calls',     value: 11,       trend: -7 },
      { label: 'Connected Rate',   value: '87%',    trend:  5 },
      { label: 'Avg. Duration',    value: '4m 32s', trend:  3 },
      { label: 'Callbacks Pending',value: 4,        trend: -6 },
    ],
  },
]

const STORAGE_KEY = 'yuzu_dashboard_v4'

interface Layout {
  groupOrder:  string[]
  hiddenGroups:string[]
  groupSpans:  Record<string, 1 | 2>
  tileOrders:  Record<string, string[]>
  hiddenTiles: Record<string, string[]>
}

function defaultLayout(): Layout {
  return {
    groupOrder:   DEFAULT_GROUPS.map(g => g.id),
    hiddenGroups: [],
    groupSpans:   {},
    tileOrders:   {},
    hiddenTiles:  {},
  }
}

function loadLayout(): Layout {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s) return { ...defaultLayout(), ...JSON.parse(s) }
  } catch {}
  return defaultLayout()
}

// ─── KPI Tile ────────────────────────────────────────────────────────────────

function KpiTile({ label, value, trend, editing, onHide, dragListeners, dragRef, isDragging }:{
  label: string; value: string|number; trend: number
  editing: boolean; onHide: ()=>void
  dragListeners?: object; dragRef?: (el:HTMLElement|null)=>void; isDragging?: boolean
}) {
  const up = trend >= 0
  return (
    <div
      ref={dragRef}
      className={`bg-white rounded-xl border border-brand-border p-3 min-w-0 relative group/tile transition-opacity ${isDragging ? 'opacity-40' : ''}`}
    >
      {editing && (
        <div className="absolute inset-0 rounded-xl ring-1 ring-yuzu-400/30 pointer-events-none" />
      )}
      {editing && (
        <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 opacity-0 group-hover/tile:opacity-100 transition-opacity z-10">
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={onHide}
            className="p-0.5 rounded bg-white border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 transition-colors"
          >
            <EyeOff className="w-2.5 h-2.5" />
          </button>
        </div>
      )}
      {editing && (
        <div
          {...dragListeners}
          className="absolute top-1.5 left-1.5 opacity-0 group-hover/tile:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-neutral-300 hover:text-neutral-500 z-10"
        >
          <GripVertical className="w-3 h-3" />
        </div>
      )}
      <p className="text-[11px] text-brand-text-secondary mb-1.5 truncate pr-4 pl-1">{label}</p>
      <div className="flex items-end justify-between gap-1">
        <span className="text-xl font-bold text-brand-text leading-none">{value}</span>
        <span className={`flex items-center gap-0.5 text-[11px] font-medium shrink-0 ${up ? 'text-green-600' : 'text-red-500'}`}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {up ? '+' : ''}{trend}%
        </span>
      </div>
    </div>
  )
}

function SortableTile(props: { metric: KpiMetric; editing: boolean; onHide: ()=>void }) {
  const { metric, editing, onHide } = props
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: metric.label, disabled: !editing,
  })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
    >
      <KpiTile
        {...metric}
        editing={editing}
        onHide={onHide}
        dragListeners={listeners}
        isDragging={isDragging}
      />
    </div>
  )
}

// ─── Group Card ───────────────────────────────────────────────────────────────

function GroupCard({
  group, editing, span, onHide, onToggleSpan,
  tileOrder, hiddenTiles,
  onTileReorder, onTileHide, onTileShow,
  groupDragListeners, groupDragRef, isGroupDragging,
}: {
  group: KpiGroup; editing: boolean; span: 1|2
  onHide: ()=>void; onToggleSpan: ()=>void
  tileOrder: string[]; hiddenTiles: string[]
  onTileReorder: (next: string[])=>void
  onTileHide: (label: string)=>void
  onTileShow: (label: string)=>void
  groupDragListeners?: object
  groupDragRef?: (el: HTMLElement|null)=>void
  isGroupDragging?: boolean
}) {
  const [activeTileId, setActiveTileId] = useState<string|null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const visibleMetrics = tileOrder
    .filter(l => !hiddenTiles.includes(l))
    .map(l => group.metrics.find(m => m.label === l)!)
    .filter(Boolean)

  const hiddenMetrics = group.metrics.filter(m => hiddenTiles.includes(m.label))
  const activeTile = activeTileId ? group.metrics.find(m => m.label === activeTileId) : null

  const tileColClass = span === 1
    ? 'grid-cols-2 sm:grid-cols-3'
    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'

  function handleTileDragStart(e: DragStartEvent) { setActiveTileId(e.active.id as string) }
  function handleTileDragEnd(e: DragEndEvent) {
    setActiveTileId(null)
    const { active, over } = e
    if (!over || active.id === over.id) return
    const from = tileOrder.filter(l => !hiddenTiles.includes(l)).indexOf(active.id as string)
    const to   = tileOrder.filter(l => !hiddenTiles.includes(l)).indexOf(over.id as string)
    if (from === -1 || to === -1) return
    const visible = tileOrder.filter(l => !hiddenTiles.includes(l))
    const reordered = arrayMove(visible, from, to)
    const next = [...reordered, ...tileOrder.filter(l => hiddenTiles.includes(l))]
    onTileReorder(next)
  }

  return (
    <div
      ref={groupDragRef}
      className={`bg-neutral-50 rounded-2xl border p-4 transition-all ${
        isGroupDragging ? 'opacity-40' : ''
      } ${editing ? 'border-yuzu-400/40' : 'border-brand-border'}`}
    >
      {/* Group header */}
      <div className="flex items-center gap-2 mb-3">
        {editing && (
          <div
            {...groupDragListeners}
            className="cursor-grab active:cursor-grabbing text-neutral-300 hover:text-neutral-500 transition-colors shrink-0"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        )}
        <p className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wide flex-1">{group.title}</p>
        {editing && (
          <div className="flex items-center gap-1">
            <button
              onPointerDown={e => e.stopPropagation()}
              onClick={onToggleSpan}
              className="p-1 rounded-lg hover:bg-neutral-200 text-neutral-400 hover:text-neutral-600 transition-colors"
              title={span === 2 ? 'Shrink' : 'Expand'}
            >
              {span === 2 ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onPointerDown={e => e.stopPropagation()}
              onClick={onHide}
              className="p-1 rounded-lg hover:bg-neutral-200 text-neutral-400 hover:text-neutral-600 transition-colors"
              title="Hide section"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Tiles */}
      <DndContext sensors={sensors} collisionDetection={closestCenter}
        onDragStart={handleTileDragStart} onDragEnd={handleTileDragEnd}>
        <SortableContext items={visibleMetrics.map(m => m.label)} strategy={rectSortingStrategy}>
          <div className={`grid gap-2 ${tileColClass}`}>
            {visibleMetrics.map(metric => (
              <SortableTile
                key={metric.label}
                metric={metric}
                editing={editing}
                onHide={() => onTileHide(metric.label)}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeTile && (
            <div className="shadow-xl rotate-1 opacity-95 cursor-grabbing">
              <KpiTile {...activeTile} editing={false} onHide={() => {}} />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Hidden tiles — shown in edit mode */}
      {editing && hiddenMetrics.length > 0 && (
        <div className="mt-3 pt-3 border-t border-neutral-200">
          <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide mb-2">Hidden</p>
          <div className="flex flex-wrap gap-1.5">
            {hiddenMetrics.map(m => (
              <button
                key={m.label}
                onPointerDown={e => e.stopPropagation()}
                onClick={() => onTileShow(m.label)}
                className="flex items-center gap-1 text-[11px] font-medium text-brand-text-secondary border border-dashed border-neutral-300 bg-white rounded-lg px-2.5 py-1 hover:border-yuzu-400 hover:text-yuzu-900 transition-colors"
              >
                <Eye className="w-3 h-3" />
                {m.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SortableGroup(props: Omit<Parameters<typeof GroupCard>[0], 'groupDragListeners'|'groupDragRef'|'isGroupDragging'> & { id: string }) {
  const { id, editing, ...rest } = props
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id, disabled: !editing,
  })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
    >
      <GroupCard
        {...rest}
        editing={editing}
        groupDragListeners={listeners}
        isGroupDragging={isDragging}
      />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LiveDashboardPage() {
  const [layout, setLayout] = useState<Layout>(loadLayout)
  const [editing, setEditing] = useState(false)
  const [activeGroupId, setActiveGroupId] = useState<string|null>(null)

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(layout)) }, [layout])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const visibleGroupIds = layout.groupOrder.filter(id => !layout.hiddenGroups.includes(id))
  const hiddenGroups    = DEFAULT_GROUPS.filter(g => layout.hiddenGroups.includes(g.id))
  const activeGroup     = activeGroupId ? DEFAULT_GROUPS.find(g => g.id === activeGroupId) : null

  function getTileOrder(groupId: string) {
    return layout.tileOrders[groupId] ?? DEFAULT_GROUPS.find(g => g.id === groupId)!.metrics.map(m => m.label)
  }
  function getHiddenTiles(groupId: string) { return layout.hiddenTiles[groupId] ?? [] }
  function getSpan(groupId: string): 1|2     { return layout.groupSpans[groupId] ?? 2 }

  function update(patch: Partial<Layout>) { setLayout(prev => ({ ...prev, ...patch })) }

  function hideGroup(id: string)  { update({ hiddenGroups: [...layout.hiddenGroups, id] }) }
  function showGroup(id: string)  { update({ hiddenGroups: layout.hiddenGroups.filter(h => h !== id) }) }

  function toggleSpan(id: string) {
    update({ groupSpans: { ...layout.groupSpans, [id]: getSpan(id) === 2 ? 1 : 2 } })
  }

  function setTileOrder(groupId: string, order: string[]) {
    update({ tileOrders: { ...layout.tileOrders, [groupId]: order } })
  }

  function hideTile(groupId: string, label: string) {
    const prev = getHiddenTiles(groupId)
    update({ hiddenTiles: { ...layout.hiddenTiles, [groupId]: [...prev, label] } })
  }

  function showTile(groupId: string, label: string) {
    update({ hiddenTiles: { ...layout.hiddenTiles, [groupId]: getHiddenTiles(groupId).filter(l => l !== label) } })
  }

  function resetLayout() { setLayout(defaultLayout()) }

  function onGroupDragStart(e: DragStartEvent) { setActiveGroupId(e.active.id as string) }
  function onGroupDragEnd(e: DragEndEvent) {
    setActiveGroupId(null)
    const { active, over } = e
    if (!over || active.id === over.id) return
    const from = layout.groupOrder.indexOf(active.id as string)
    const to   = layout.groupOrder.indexOf(over.id as string)
    update({ groupOrder: arrayMove(layout.groupOrder, from, to) })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />LIVE
        </span>
        <div className="flex items-center gap-4 text-sm text-brand-text-secondary">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>Online Members</span>
            <span className="font-bold text-brand-text">14</span>
            <span className="text-xs text-neutral-400">/28</span>
            <span className="text-[11px] font-medium text-green-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />8%
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Headphones className="w-4 h-4" />
            <span>Active Channels</span>
            <span className="font-bold text-brand-text">12</span>
            <span className="text-xs text-neutral-400">/15</span>
            <span className="text-[11px] font-medium text-green-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />2%
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {editing && (
            <button
              onClick={resetLayout}
              className="text-xs font-medium text-brand-text-secondary hover:text-brand-text px-3 py-1.5 rounded-full border border-brand-border hover:bg-neutral-50 transition-colors"
            >
              Reset
            </button>
          )}
          <button
            onClick={() => setEditing(e => !e)}
            className={`flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-full text-xs transition-colors ${
              editing
                ? 'bg-brand-text text-white hover:bg-neutral-700'
                : 'bg-white border border-brand-border text-brand-text-secondary hover:bg-neutral-50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            {editing ? 'Done' : 'Customize'}
          </button>
          <button className="p-1.5 rounded-lg border border-brand-border bg-white text-neutral-500 hover:bg-neutral-50 transition-colors">
            <Settings2 className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1.5 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-3 py-1.5 rounded-full text-xs transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.35)]">
            <Plus className="w-3.5 h-3.5" /> Add Content
          </button>
        </div>
      </div>

      {/* Hidden groups tray */}
      {editing && hiddenGroups.length > 0 && (
        <div className="mb-4 p-3 bg-neutral-50 rounded-xl border border-dashed border-neutral-300">
          <p className="text-xs font-semibold text-brand-text-secondary mb-2 uppercase tracking-wide">Hidden sections</p>
          <div className="flex flex-wrap gap-2">
            {hiddenGroups.map(g => (
              <button key={g.id} onClick={() => showGroup(g.id)}
                className="flex items-center gap-1.5 text-xs font-medium text-brand-text-secondary border border-brand-border bg-white rounded-full px-3 py-1 hover:border-yuzu-400 hover:text-yuzu-900 transition-colors">
                <Eye className="w-3 h-3" />{g.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Groups grid */}
      <DndContext sensors={sensors} collisionDetection={closestCenter}
        onDragStart={onGroupDragStart} onDragEnd={onGroupDragEnd}>
        <SortableContext items={visibleGroupIds} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 gap-4">
            {visibleGroupIds.map(id => {
              const group = DEFAULT_GROUPS.find(g => g.id === id)!
              const span  = getSpan(id)
              return (
                <div key={id} className={span === 2 ? 'col-span-2' : 'col-span-1'}>
                  <SortableGroup
                    id={id}
                    group={group}
                    editing={editing}
                    span={span}
                    onHide={() => hideGroup(id)}
                    onToggleSpan={() => toggleSpan(id)}
                    tileOrder={getTileOrder(id)}
                    hiddenTiles={getHiddenTiles(id)}
                    onTileReorder={order => setTileOrder(id, order)}
                    onTileHide={label => hideTile(id, label)}
                    onTileShow={label => showTile(id, label)}
                  />
                </div>
              )
            })}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeGroup && (
            <div className="shadow-2xl rotate-1 opacity-90 cursor-grabbing">
              <GroupCard
                group={activeGroup}
                editing={false}
                span={getSpan(activeGroup.id)}
                onHide={() => {}} onToggleSpan={() => {}}
                tileOrder={getTileOrder(activeGroup.id)}
                hiddenTiles={getHiddenTiles(activeGroup.id)}
                onTileReorder={() => {}} onTileHide={() => {}} onTileShow={() => {}}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
