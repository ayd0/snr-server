const recursiveDeleteParent = (
    parentType,
    childType,
    parentId,
    childKeyName,
) => {
    // type of childKeyName must be string
    let resolved = new Promise((resolve, reject) => {
        parentType
            .findById(parentId)
            .then((parent) => {
                for (const child of parent[childKeyName]) {
                    childType
                        .findById(child.toString())
                        .then(() => {
                            childType
                                .deleteOne({ _id: child.toString() })
                                .catch((err) => reject(err));
                        })
                        .catch((err) => reject(err));
                }
            })
            .then(() => {
                parentType
                    .deleteOne({ _id: parentId })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => reject(err));
    });

    return resolved;
};

module.exports = { recursiveDeleteParent };
