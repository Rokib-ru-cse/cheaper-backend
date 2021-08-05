const  linearCategoryList = (categories, cat = []) => {

    for (let category of categories) {
        cat.push({
            value: category._id,
            name: category.name,
            parentId: category.parentId,
            type:category.type
        })
        if (category.children.length > 0) {
            linearCategoryList(category.children, cat)
        }
    }
    return cat
}

export default linearCategoryList