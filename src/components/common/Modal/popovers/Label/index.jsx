import React from 'react';
import {useSelector} from "react-redux";

import Popover from "../../../Popover";
import Label from "../../Label";

import styles from "./Label.module.scss";

const LabelPopover = ({setPopoverType, popoverRef, setEditingLabel, card}) => {
  const labels = useSelector(state => state.columnsReducer.labels);

  return (
    <Popover
      heading="Метки"
      close={() => setPopoverType(null)}
      popoverRef={popoverRef}
    >
      <h4 className={styles.popover__labels_subheading}>Метки</h4>
      <ul className={styles.popover__labels}>
        {labels.map(label => {
          return <Label
            key={label.id}
            label={label}
            card={card}
            onEdit={(label) => {
              setPopoverType('editingLabel');
              setEditingLabel(label);
            }}
          />;
        })}
      </ul>
      <button
        className={styles.popover__label_create_button}
        onClick={() => setPopoverType('creatingLabel')}
      >
        Создать новую метку
      </button>
    </Popover>
  );
}

export default LabelPopover;
