import React from 'react';

interface Trigger {
  name: string;
  type: string;
  description: string;
}

interface ListAllTriggersFormProps {
  triggers: Trigger[];
}

function ListAllTriggersForm({ triggers }: ListAllTriggersFormProps) {
  return (
    <div>
      {triggers.map((trigger, index) => (
        <div key={index}>
          <h3>{trigger.name}</h3>
          <p>Type: {trigger.type}</p>
          <p>Description: {trigger.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ListAllTriggersForm;
