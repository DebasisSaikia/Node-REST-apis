
const App = () => {

    const [products, setProducts] = React.useState([]);

    const [formData, setFormData] = React.useState({
        name: '',
        price: ''
    })

    React.useEffect(() => {
        fetchProducts()
    }, [])

    function fetchProducts() {
        fetch('/api/products').then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            setProducts(data)
        })
    }


    // submitting the form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price) {
            return;
        }

        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((data) => {
                fetchProducts()
                setFormData({ name: '', price: '' })
            })

    }

    function updateForm(e, field) {
        if (field === 'name') {
            setFormData({
                ...formData,
                name: e.target.value
            })
        } else if (field === 'price') {
            setFormData({
                ...formData,
                price: e.target.value
            })
        }
    }

    // delete item
    const deleteProduct = (productId) => {
        fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        }).then((res) => res.json())
            .then((data) => {
                fetchProducts()
                console.log(data)
            })
    }

    return (
        <div>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-header">
                    Add Product
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} >
                        <input type="text" value={formData.name}
                            onChange={(e) => updateForm(e, 'name')} placeholder="Product-Name" className="form-control mt-3" />
                        <input type="text" value={formData.price}
                            onChange={(e) => updateForm(e, 'price')} placeholder="Product-Price" className="form-control mt-3" />
                        <button type='submit' className="btn btn-primary mt-3">Submit</button>
                    </form>
                </div>

            </div>
            <ul className="list-group">
                {products.map((product) => {
                    return (
                        <li key={product.id} className="list-group-item d-flex justify-content-between">
                            <div>
                                <strong>{product.name} : </strong>
                                ${product.price}
                            </div>
                            <button className="btn" onClick={() => deleteProduct(product.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                </svg>
                            </button>
                        </li>
                    )
                })}

            </ul>

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))

