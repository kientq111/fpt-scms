import { categoryConstants, subCategoryConstatnts } from "../constants/Constants"


export const addCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case categoryConstants.CATEGORY_ADD_REQUEST:
            return { loading: true }
        case categoryConstants.CATEGORY_ADD_SUCCESS:
            return { loading: false, categoryInfo: action.payload }
        case categoryConstants.CATEGORY_ADD_FAIL:
            return { loading: false, error: action.payload }
        case categoryConstants.CATEGORY_ADD_RESET:
            return {}
        default:
            return state
    }
}

export const editCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case categoryConstants.CATEGORY_EDIT_REQUEST:
            return { loading: true }
        case categoryConstants.CATEGORY_EDIT_SUCCESS:
            return { loading: false, categoryInfo: action.payload, success: true }
        case categoryConstants.CATEGORY_EDIT_FAIL:
            return { loading: false, error: action.payload }
        case categoryConstants.CATEGORY_EDIT_RESET:
            return {}
        default:
            return state
    }
}


export const listCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case categoryConstants.CATEGORY_LIST_REQUEST:
            return { loading: true }
        case categoryConstants.CATEGORY_LIST_SUCCESS:
            return { loading: false, categoryInfo: action.payload }
        case categoryConstants.CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//Subcategory ZONEE
export const listSubCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case subCategoryConstatnts.SUB_CATEGORY_LIST_REQUEST:
            return { loading: true }
        case subCategoryConstatnts.SUB_CATEGORY_LIST_SUCCESS:
            return { loading: false, subcategoryInfo: action.payload }
        case subCategoryConstatnts.SUB_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const addSubCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case subCategoryConstatnts.SUB_CATEGORY_ADD_REQUEST:
            return { loading: true }
        case subCategoryConstatnts.SUB_CATEGORY_ADD_SUCCESS:
            return { loading: false, subCategoryInfo: action.payload }
        case subCategoryConstatnts.SUB_CATEGORY_ADD_FAIL:
            return { loading: false, error: action.payload }
        case subCategoryConstatnts.SUB_CATEGORY_ADD_RESET:
            return {}
        default:
            return state
    }
}

export const editSubCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case subCategoryConstatnts.SUB_CATEGORY_EDIT_REQUEST:
            return { loading: true }
        case subCategoryConstatnts.SUB_CATEGORY_EDIT_SUCCESS:
            return { loading: false, subCategoryInfo: action.payload, success: true }
        case subCategoryConstatnts.SUB_CATEGORY_EDIT_FAIL:
            return { loading: false, error: action.payload }
        case subCategoryConstatnts.SUB_CATEGORY_EDIT_RESET:
            return {}
        default:
            return state
    }
}