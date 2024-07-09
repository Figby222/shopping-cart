const useItemData = function(URL) {
    let error;
    if (!URL) {
        error = true;
    }

    const data = {
        id: 5,
        title: "a",
        price: 2,
        description: "a",
        imageSrc: "a"
    }
    return { error, isLoading: false, data };
}

export default useItemData;

