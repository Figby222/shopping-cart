const useItemData = function(URL) {
    let error;
    if (!URL) {
        error = true;
    }
    return { error, isLoading: false, data: true };
}

export default useItemData;

