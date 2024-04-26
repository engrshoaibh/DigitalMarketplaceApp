import React from "react";

function SellerCard({ seller }) {
    const handleSellerApprove = () => {
      // Logic for approving the seller
      console.log(`Seller ${seller.id} approved`);
    };
  
    const handleSellerReject = () => {
      // Logic for rejecting the seller
      console.log(`Seller ${seller.id} rejected`);
    };
  
    return (
      <div className="flex items-center border border-gray-200 rounded-lg p-4 mb-4">
        {/* Seller Details */}
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">{seller.name}</h2>
          <p className="text-sm text-gray-500">{seller.description}</p>
        </div>
  
        {/* Status */}
        <div className="flex items-center mr-4">
          <div className={`text-sm font-bold px-2 py-1 rounded ${seller.status === 'accepted' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {seller.status === 'Approved' ? 'Approved' : 'Rejected'}
          </div>
        </div>
  
        {/* Approve and Reject Buttons */}
        <div>
          <button onClick={handleSellerApprove} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-2 hover:bg-green-600">
            Approve
          </button>
          <button onClick={handleSellerReject} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">
            Reject
          </button>
        </div>
      </div>
    );
}

function SellerList({ sellers }) {
    return (
        <div>
        {sellers.map(seller => (
            <SellerCard key={seller.id} seller={seller} />
        ))}
        </div>
    );
}


export default SellerList;