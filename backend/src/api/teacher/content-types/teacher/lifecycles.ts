
export default {

    afterCreate(event) {
        const { result, params } = event;
        const { data } = event.params;

        console.info(data)

        // do something to the result;
    },


    afterUpdate(event) {
        const { result, params } = event;
        const { data } = event.params;
        const { Disciplines, Name, Classes } = data

        console.info(data, Disciplines, `Discipline:`, Disciplines?.[0], `Icon:`, Disciplines?.[0]?.Icon, `Name:`, Name,`Classes:`, Classes);

        // do something to the result;
    },
};