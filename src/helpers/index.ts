export const sortByFunction = state => {
  const list = [...state.list]
  const element = state.sortBy.element
  if (state.sortBy.direction === 'asc') {
    state.list.sort((a, b) => Date.parse(a[element]) - Date.parse(b[element]))
  }
  if (state.sortBy.direction === 'desc') {
    state.list.sort((a, b) => Date.parse(b[element]) - Date.parse(a[element]))
  }
  return list
}
