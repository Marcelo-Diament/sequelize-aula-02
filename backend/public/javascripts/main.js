window.onload = () => {
  const handleSearchForm = () => {
    const searchForm = document.querySelector('#searchUserSection form'),
      searchParamSelect = searchForm.querySelector('.search-param select'),
      searchValueInput = searchForm.querySelector('.search-value input'),
      searchRole = searchForm.querySelector('.search-value #searchRole')

    const showInputSearch = () => {
      searchValueInput.value = ''
      searchValueInput.setAttribute('type', 'text')
      !searchRole.classList.contains('hidden') && searchRole.classList.add('hidden')
    }

    const hideInputSearch = () => {
      searchValueInput.setAttribute('type', 'hidden')
      searchRole.classList.contains('hidden') && searchRole.classList.remove('hidden')
      searchRole.onchange = () => searchValueInput.value = searchRole.value
    }

    const toggleInputSearch = () => searchParamSelect.value === 'id_funcao' ? hideInputSearch() : showInputSearch()

    const updateSearchFormAction = () => searchForm.setAttribute('action', `/users/search/${searchParamSelect.value}/${searchValueInput.value}`)

    searchParamSelect.onchange = () => toggleInputSearch()

    searchForm.onsubmit = () => {
      event.preventDefault()
      updateSearchFormAction()
      searchForm.submit()
    }
  }

  const init = () => {
    handleSearchForm()
  }

  init()

}