

export default ( req, res ) => {

    res.setPreviewData({})
    return res.status( 401 ).json({ message: 'Will preview.' })
}