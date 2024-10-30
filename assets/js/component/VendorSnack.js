const {Snackbar} = wp.components;
const {useState} = wp.element;

export default function VendorSnack() {
    return (
        <div className="snack-wrapper">
            <Snackbar>Ask admin to increase limit or enable features</Snackbar>
        </div>
    )
}