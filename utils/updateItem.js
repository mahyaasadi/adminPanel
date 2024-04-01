const updateItem = (id, newArr, data, setData) => {
    let index = data.findIndex((x) => x._id === id);
    let g = data[index];
    g = newArr;

    if (index === -1) {
        console.log("no match");
    } else
        setData([
            ...data.slice(0, index),
            g,
            ...data.slice(index + 1),
        ]);
}

module.exports.updateItem = updateItem;