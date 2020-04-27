export default function auth({ next, router, store }) {
    if (!store.state.dataPDF.archivo || !localStorage.getItem('auth')) {
        return router.push({ name: 'NuevaReceta' });
    }

    return next();
}