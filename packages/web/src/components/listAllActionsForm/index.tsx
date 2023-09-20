import React from 'react';

interface Action {
  name: string;
  description: string;
}

interface ListAllActionsFormProps {
  actions: Action[];
}

function ListAllActionsForm({ actions }: ListAllActionsFormProps) {
  return (
    <div>
      {actions.map((action, index) => (
        <div key={index}>
          <h3>{action.name}</h3>
          <p>Description: {action.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ListAllActionsForm;
