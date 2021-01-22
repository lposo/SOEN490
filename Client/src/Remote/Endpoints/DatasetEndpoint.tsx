import { ISearchDatasetsFormModel } from "../../Components/Search/ISearchDatasetsFormModel"
import { get } from "../RemoteHelper"
import { stringify } from "query-string"

const userUploadedDatasetsRoute = '/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/dataset/userSavedDatsets/:userSavedDatsets'
const datasetRoute = '/dataset*'

interface ICategoryModel {
  id: number,
  name: string
}
interface ISubcategoryModel {
  id: number,
  name: string
}
interface IMaterialModel {
  details: string
  composition: string
  id: number
}

export const getDatasets = async (query: ISearchDatasetsFormModel): Promise<any> => {
  const remoteDatasets = await get(datasetRoute, stringify(query))
  console.log(remoteDatasets)
  return remoteDatasets
}

export const listCategories = async (): Promise<ICategoryModel[]> => {
  const categories = await get('/category')
  console.log(categories)
  return categories
}
export const listSubcategories = async (): Promise<ISubcategoryModel[]> => {
  const subcategories = await get('/subcategory')
  console.log(subcategories)
  return subcategories
}
export const listMaterials = async (): Promise<IMaterialModel[]> => {
  const materials = await get('/material')
  console.log(materials)
  return materials
}
