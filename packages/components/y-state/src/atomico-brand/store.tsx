// interface State {
//     api: string;
//     loading: boolean;
//     products: { id: number; title: string; price: number };
// }
//
// const initialState = (state: State) => ({
//     api: "",
//     loading: false,
//     products: [],
// });
//
// async function* getProducts(state: State) {
//     yield { ...state, loading: true };
//     return {
//         ...(yield),
//         loading: false,
//         products: await (await fetch(state.api)).json(),
//     };
// }
//
// const store = new Store(initialState, {
//     actions: { getProducts },
// });