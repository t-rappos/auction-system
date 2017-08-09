     //TODO: check that the server isnt sending unneccesarry tagNames
    function sanityCheckHeaders(tagValues){
        let tagIds = [];
        tagValues.map((tv)=>{
            tagIds[tv.tagId] = true;
            
        });
        console.log(tagIds);
        return tagIds;
    }

    function checkTagNameIsUsed(tagIds, tag){
        console.log('checking ', tag);
        console.log('against', tagIds);
        let r = (tagIds[tag.id] !== undefined);
        console.log(r);
        return r;
    }

    module.exports = {sanityCheckHeaders, checkTagNameIsUsed};