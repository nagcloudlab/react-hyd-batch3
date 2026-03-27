import { useParams } from 'react-router-dom';

function RoutingDemoItem() {
    const { categoryId, itemId } = useParams();

    return (
        <div className="mt-3 p-3 bg-white border rounded-3">
            <h3 className="h6 mb-2">Item Details</h3>
            <p className="mb-1"><strong>Category:</strong> {categoryId}</p>
            <p className="mb-0"><strong>Item ID:</strong> {itemId}</p>
        </div>
    );
}

export default RoutingDemoItem;
