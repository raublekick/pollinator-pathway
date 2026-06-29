<script setup lang="ts">
/**
 * A simple table component for displaying tabular data.
 *
 * @component SimpleTable
 *
 * @prop {Array<TableField>} fields - The fields to display as table columns.
 * @prop {Array<TableItem>} items - The data items to display in the table.
 * @prop {number} perPage - The number of items to display per page.
 * @prop {number} currentPage - The current page number.
 * @prop {string} identifier - The unique identifier key for each item.
 * @prop {boolean} showDetails - Whether to show details for each item.
 * @prop {boolean} toggleableDetails - Whether the details section is toggleable.
 * @prop {Array<boolean>} expandDetails - An array of booleans indicating whether to expand the details section for each item.
 * @prop {boolean} clientSidePaging - Whether to enable client-side pagination. Defaults to true.
 * @prop {boolean} clientSideSorting - Whether to enable client-side sorting. Defaults to true.
 *
 * @emits SimpleTable#detailsToggle - Emitted when the details section is toggled for an item.
 * @emits SimpleTable#sort - Emitted when sorting is requested and client-side sorting is disabled. Payload: SortConfig | SortConfig[] (where SortConfig = { sortKey: string, sortDesc: boolean })
 *
 * @example
 * <SimpleTable
 *   :fields="[
 *     { key: 'name', label: 'Name' },
 *     { key: 'age', label: 'Age' },
 *     { key: 'email', label: 'Email' }
 *   ]"
 *   :items="[
 *     { name: 'John Doe', age: 30, email: 'john.doe@example.com' },
 *     { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' }
 *   ]"
 *   :perPage="10"
 *   :currentPage="1"
 *   identifier="id"
 *   :showDetails="true"
 *   :toggleableDetails="true"
 *   :expandDetails="[true, false]"
 *   :clientSidePaging="true"
 *   :clientSideSorting="true"
 *   @sort="handleSort"
 * >
 *   <template #detailsToggle="{ item }">
 *     <a @click.prevent="toggleDetails(item)">{{ detailToggles[item[identifier]] ? '▼' : '▶' }}</a>
 *   </template>
 *   <template #cell(name)="{ item }">
 *     {{ item.name }}
 *   </template>
 *   <template #cell(age)="{ item }">
 *     {{ item.age }}
 *   </template>
 *   <template #cell(email)="{ item }">
 *     {{ item.email }}
 *   </template>
 *   <template #details="{ item }">
 *     <pre>{{ JSON.stringify(item, null, 2) }}</pre>
 *   </template>
 * </SimpleTable>
 */
import { computed, ref, type PropType, watch } from 'vue'
import { sort } from 'fast-sort'

interface TableField {
  key: string
  label: string
  format?: Function
  hidden?: boolean
  header?: boolean
  sortable?: boolean
  sortKey?: string | string[]
}

interface TableItem {
  [key: string]: any
}

interface SortConfig {
  sortKey: string | string[]
  sortDesc: boolean
}

const props = defineProps({
  fields: { type: Array as PropType<TableField[]>, default: () => [] },
  items: { type: Array as PropType<TableItem[]>, default: () => [] },
  perPage: {
    type: Number,
    default() {
      return 10
    }
  },
  currentPage: {
    type: Number,
    required: true
  },
  identifier: {
    type: String,
    required: true
  },
  showDetails: {
    type: Boolean,
    default: false
  },
  toggleableDetails: {
    type: Boolean,
    default: false
  },
  expandDetails: {
    type: Array<Boolean>,
    default: () => []
  },
  rowClass: {
    type: Function,
    default: () => () => ''
  },
  clientSidePaging: {
    type: Boolean,
    default: true
  },
  clientSideSorting: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits<{
  sort: [payload: SortConfig | SortConfig[]]
}>()

const sortBy = ref<SortConfig | SortConfig[] | undefined>(undefined)
const detailToggles = ref<Array<Boolean>>([])

const normalizeSortKeys = (sortKey: string | string[]): string[] => {
  return Array.isArray(sortKey) ? sortKey : [sortKey]
}

const areSortKeysEqual = (left: string | string[], right: string | string[]): boolean => {
  const leftKeys = normalizeSortKeys(left)
  const rightKeys = normalizeSortKeys(right)

  return (
    leftKeys.length === rightKeys.length && leftKeys.every((key, index) => key === rightKeys[index])
  )
}

// Normalize sortBy to array format for easier handling
const getSortConfigs = (): SortConfig[] => {
  if (!sortBy.value) {
    return [] as SortConfig[]
  }
  if (Array.isArray(sortBy.value)) {
    return sortBy.value as SortConfig[]
  }
  return [sortBy.value] as SortConfig[]
}

// Check if a key is currently sorted
const isSortKeyEqual = (key: string | string[]): boolean => {
  return getSortConfigs().some((config) => areSortKeysEqual(config.sortKey, key))
}

// Get sort direction for a specific key
const getSortDir = (key: string | string[]): boolean | null => {
  const config = getSortConfigs().find((c) => areSortKeysEqual(c.sortKey, key))
  return config ? config.sortDesc : null
}

const sortedItems = computed(() => {
  const { items, clientSideSorting } = props
  const configs = getSortConfigs()

  // If client-side sorting is disabled, return items as-is
  if (!clientSideSorting || configs.length === 0) return items

  // Build sort specifications for fast-sort
  const sortSpecs = configs.flatMap((config) => {
    const { sortKey, sortDesc } = config

    const getValue = (item: any, key: string) => {
      if (key.includes('.')) {
        const path = key.split('.')
        return path.reduce((acc, k) => acc?.[k], item)
      }
      return item[key]
    }

    return normalizeSortKeys(sortKey).map((key) =>
      sortDesc
        ? {
            desc: (item: any) => getValue(item, key)
          }
        : {
            asc: (item: any) => getValue(item, key)
          }
    )
  })

  return sort(items).by(sortSpecs)
})

const setSort = (key: string | string[], toggleMode: boolean = false) => {
  const configs = getSortConfigs()
  const existingIndex = configs.findIndex((c) => areSortKeysEqual(c.sortKey, key))

  let newConfigs: SortConfig[]

  if (existingIndex !== -1) {
    // Key is already sorted - cycle direction or remove
    const config = configs[existingIndex]
    if (config.sortDesc === true) {
      // Remove from sort
      newConfigs = configs.filter((_, i) => i !== existingIndex)
    } else {
      // Toggle to desc
      config.sortDesc = true
      newConfigs = configs
    }
  } else {
    // New key - replace all (single-sort mode) or add to array (multi-sort mode)
    if (toggleMode) {
      // Multi-sort: add to existing sorts
      newConfigs = [...configs, { sortKey: key, sortDesc: false }]
    } else {
      // Single-sort: replace all
      newConfigs = [{ sortKey: key, sortDesc: false }]
    }
  }

  // Set sortBy to single object if only one config, else array
  sortBy.value =
    newConfigs.length === 1 ? newConfigs[0] : newConfigs.length > 0 ? newConfigs : undefined

  if (!props.clientSideSorting && sortBy.value) {
    emit('sort', sortBy.value)
  }
}

const paginatedItems = computed(() => {
  const { currentPage, perPage, clientSidePaging } = props

  // If client-side paging is disabled, return all sorted items
  if (!clientSidePaging) return sortedItems.value

  const start = (currentPage - 1) * perPage
  const stop = start + perPage

  return sortedItems.value.slice(start, stop)
})

const totalCols = computed(() => {
  return props.fields.length + (props.showDetails && props.toggleableDetails ? 2 : 0)
})

watch(
  () => props.expandDetails,
  () => {
    detailToggles.value = props.expandDetails
  },
  { immediate: true }
)
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-if="showDetails && toggleableDetails"></th>
        <template v-for="{ key, label, sortable, sortKey } in fields" :key="key">
          <th
            v-if="sortable"
            @click.exact="setSort(sortKey ? sortKey : key)"
            @click.shift="setSort(sortKey ? sortKey : key, true)"
            class="sortable"
          >
            {{ label }}
            <template v-if="isSortKeyEqual(sortKey ? sortKey : key)">
              <span v-if="getSortDir(sortKey ? sortKey : key) === true">↑</span>
              <span v-else-if="getSortDir(sortKey ? sortKey : key) === false">↓</span>
            </template>
          </th>
          <th v-else>
            {{ label }}
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!items.length" style="text-align: center">
        <td :colspan="totalCols">
          <slot name="emptyRow">No items to show.</slot>
        </td>
      </tr>
      <template v-for="item in paginatedItems" :key="item[identifier]">
        <tr :class="rowClass(item)">
          <td v-if="showDetails && toggleableDetails">
            <slot name="detailsToggle" :item="item">
              <a
                class="table-details-toggle"
                @click.prevent="detailToggles[item[identifier]] = !detailToggles[item[identifier]]"
                >{{
                  detailToggles[item[identifier]] ? '&blacktriangledown;' : '&blacktriangleright;'
                }}
              </a>
            </slot>
          </td>
          <td v-for="{ key } in fields" :key="key">
            <slot :name="`cell(${key})`" :item="item" :toggle="detailToggles[item[identifier]]">
              {{ item[key] }}
            </slot>
          </td>
        </tr>
        <tr v-if="showDetails && (!toggleableDetails || detailToggles[item[identifier]])">
          <td :colspan="totalCols">
            <slot name="details" :item="item">
              <pre>{{ JSON.stringify(item, null, 2) }}</pre>
            </slot>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style>
th.sortable {
  cursor: pointer;
}

td a.table-details-toggle {
  cursor: pointer;
  /* don't underline */
  text-decoration: none;
}
</style>
