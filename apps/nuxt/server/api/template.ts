
export default defineEventHandler(event => {
    const templateStorage = useStorage('assets:server').getKeys("template");
    return templateStorage.map((key) => {
        return {
            name: key,
            code: useStorage('assets:server').get(`template/${key}`),
            url: `/template/${key}`
        }
    })
})
    
