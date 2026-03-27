import React, { useState } from "react";
import { Checkbox, Button, FormControlLabel, Box } from "@mui/material";

function MultipleChoice({ q, onSubmit }) {
  const [selected, setSelected] = useState([]);

  const toggle = (idx) => {
    if (selected.includes(idx)) setSelected(selected.filter(i => i !== idx));
    else setSelected([...selected, idx]);
  };

  return (
    <Box>
      {q.options.map((opt, idx) => (
        <FormControlLabel
          key={idx}
          control={
            <Checkbox
              checked={selected.includes(idx)}
              onChange={() => toggle(idx)}
            />
          }
          label={opt}
        />
      ))}
      <Button onClick={() => onSubmit(selected)} variant="contained" color="primary">
        回答
      </Button>
    </Box>
  );
}

export default MultipleChoice;