     //TODO: check that the server isnt sending unneccesarry tagNames
    function sanityCheckHeaders(tagValues){
        let tagIds = [];
        tagValues.map((tv)=>{
            tagIds[tv.tagId] = true;
        });

        return tagIds;
    }

    function checkTagNameIsUsed(tagIds, tag){
        let r = (tagIds[tag.id] !== undefined);
        return r;
    }

    module.exports = {sanityCheckHeaders, checkTagNameIsUsed};