export default function OrdersEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-medium">No orders yet</p>
            <p className="text-ds-text-muted mt-1 text-sm">Your past orders will show up here once you place one.</p>
        </div>
    );
}