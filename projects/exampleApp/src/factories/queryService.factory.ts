import { QueryFilterService } from '../services'

// this factory is used to grab query params before the page load completes
// so that we don't trigger any confusing cycles with our components/app
export function queryServiceFactory(queryFilterService: QueryFilterService) {
  return queryFilterService.decodeQueryFilters
}