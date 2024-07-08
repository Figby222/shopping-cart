const useItemData = function(URL) {
    let error;
    if (!URL) {
        error = true;
    }
    return { error, isLoading: false, data: null };
}

export default useItemData;

