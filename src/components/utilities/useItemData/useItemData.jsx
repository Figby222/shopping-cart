const useItemData = function(URL) {
    let error;
    if (!URL) {
        error = true;
    }

    const data = {
        id: true,
        title: true,
        price: true,
        description: true,
        imageSrc: true
    }
    return { error, isLoading: false, data };
}

export default useItemData;

