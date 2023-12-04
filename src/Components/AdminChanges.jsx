import React from "react";

const AdminChanges = ({ handleFire, employee, index }) => {
  const { _id, photoURL, name, designation } = employee;

  return (
    <tr key={_id}>
      <td>
        <div className="mask mask-squircle w-12 h-12">
          <img src={photoURL} alt="Avatar Tailwind CSS Component" />
        </div>
      </td>
      <td>{name}</td>
      <td>{designation}</td>
      <td className="py-2 px-4">
        <button
          className="btn text-[#F85A47]"
          onClick={() => document.getElementById("fire_modal").showModal()}
        >
          Fire
        </button>
        <dialog id="fire_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-[#F85A47]">
              Samuel Developers
            </h3>
            <h3>{_id}</h3>
            <p className="py-4">Are You Sure?</p>
            <div className="modal-action  flex">
              <button
                className="btn text-[#F85A47]"
                onClick={() => {
                  handleFire(_id);
                  document.getElementById("fire_modal").close();
                }}
              >
                Yes
              </button>
              <button
                className="btn text-[#F85A47]"
                onClick={() => document.getElementById("fire_modal").close()}
              >
                No
              </button>
            </div>
          </div>
        </dialog>
      </td>
    </tr>
  );
};

export default AdminChanges;
