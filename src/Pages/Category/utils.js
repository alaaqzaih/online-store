export function mappCategory(categories) {
    return categories.map((category) => {

        return {
            name: category,
            image: `/images/${category}.png`,
            label: category.toUpperCase()
        }


    })
}