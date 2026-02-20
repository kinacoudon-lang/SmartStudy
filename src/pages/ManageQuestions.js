import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";

function ManageQuestions() {
  const [questions, setQuestions] = useState([]);
  const [type, setType] = useState("single"); // single, multiple, text
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0); // single: number, multiple: array
  const [correctTexts, setCorrectTexts] = useState([""]);
  const [tags, setTags] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // 初回ロード
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestions(stored);
  }, []);

  // type 切替時の correct 初期化
  useEffect(() => {
    if (type === "multiple") setCorrect([]);
    else if (type === "single") setCorrect(0);
    else setCorrectTexts([""]);
  }, [type]);

  // 問題追加 or 編集保存
  const handleSaveQuestion = () => {
    let newQuestion = { type, question: questionText, tags: tags.split(",").map(t => t.trim()).filter(t => t) };

    if (type === "single") {
      newQuestion.options = options;
      newQuestion.answer = correct;
    } else if (type === "multiple") {
      newQuestion.options = options;
      newQuestion.answer = Array.isArray(correct) ? correct : [];
    } else if (type === "text") {
      newQuestion.correctTexts = correctTexts.filter(c => c.trim() !== "");
    }

    let updated = [...questions];
    if (editingIndex !== null) {
      updated[editingIndex] = newQuestion; // 編集上書き
      setEditingIndex(null);
    } else {
      updated.push(newQuestion); // 新規追加
    }

    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));

    // フォームリセット
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrect(type === "multiple" ? [] : 0);
    setCorrectTexts([""]);
    setTags("");
  };

  const handleDelete = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));
    if (editingIndex === index) setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const q = questions[index];
    setType(q.type);
    setQuestionText(q.question);
    setTags(q.tags ? q.tags.join(", ") : "");
    if (q.type === "single") {
      setOptions(q.options || ["", "", "", ""]);
      setCorrect(q.answer);
    } else if (q.type === "multiple") {
      setOptions(q.options || ["", "", "", ""]);
      setCorrect(Array.isArray(q.answer) ? q.answer : []);
    } else if (q.type === "text") {
      setCorrectTexts(q.correctTexts || [""]);
    }
    setEditingIndex(index);
  };

  const toggleMultipleCorrect = (idx) => {
    if (!Array.isArray(correct)) return;
    if (correct.includes(idx)) setCorrect(correct.filter((i) => i !== idx));
    else setCorrect([...correct, idx]);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>問題管理 {editingIndex !== null && "(編集中)"}</Typography>

      <Box mb={2}>
        <Typography>問題タイプ:</Typography>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="single">選択式</MenuItem>
          <MenuItem value="multiple">複数選択式</MenuItem>
          <MenuItem value="text">記述式</MenuItem>
        </Select>
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="問題文"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </Box>

      {(type === "single" || type === "multiple") && (
        <Box mb={2}>
          <Typography>選択肢:</Typography>
          {options.map((opt, idx) => (
            <Box key={idx} display="flex" alignItems="center" mb={1}>
              {type === "multiple" ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Array.isArray(correct) && correct.includes(idx)}
                      onChange={() => toggleMultipleCorrect(idx)}
                    />
                  }
                  label=""
                />
              ) : (
                <Checkbox
                  checked={correct === idx}
                  onChange={() => setCorrect(idx)}
                />
              )}
              <TextField
                value={opt}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[idx] = e.target.value;
                  setOptions(newOptions);
                }}
                placeholder={`選択肢 ${idx + 1}`}
                fullWidth
              />
            </Box>
          ))}
          <Button onClick={() => setOptions([...options, ""])}>選択肢追加</Button>
        </Box>
      )}

      {type === "text" && (
        <Box mb={2}>
          <Typography>正解候補:</Typography>
          {correctTexts.map((txt, idx) => (
            <Box key={idx} display="flex" alignItems="center" mb={1}>
              <TextField
                value={txt}
                onChange={(e) => {
                  const newTexts = [...correctTexts];
                  newTexts[idx] = e.target.value;
                  setCorrectTexts(newTexts);
                }}
                placeholder={`正解 ${idx + 1}`}
                fullWidth
              />
            </Box>
          ))}
          <Button onClick={() => setCorrectTexts([...correctTexts, ""])}>正解候補追加</Button>
        </Box>
      )}

      <Box mb={2}>
        <TextField
          fullWidth
          label="タグ (カンマ区切り)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Box>

      <Button variant="contained" color="primary" onClick={handleSaveQuestion}>
        {editingIndex !== null ? "保存" : "問題追加"}
      </Button>

      <Box mt={4}>
        <Typography variant="h5">既存の問題</Typography>
        {questions.map((q, idx) => (
          <Box key={idx} p={2} mb={2} border="1px solid #ccc" borderRadius="8px">
            <Typography>
              <strong>{q.type}</strong> - {q.question} 
              {q.tags && q.tags.length > 0 && ` [${q.tags.join(", ")}]`}
            </Typography>

            {(q.type === "single" || q.type === "multiple") && (
              <ul>
                {q.options.map((o, i) => (
                  <li key={i}>
                    {o} 
                    {q.type === "single" ? (q.answer === i ? " (正解)" : "") 
                      : (Array.isArray(q.answer) && q.answer.includes(i) ? " (正解)" : "")}
                  </li>
                ))}
              </ul>
            )}

            {q.type === "text" && (
              <Typography>正解候補: {q.correctTexts.join(", ")}</Typography>
            )}

            <Button color="secondary" onClick={() => handleEdit(idx)} sx={{ mr: 1 }}>編集</Button>
            <Button color="error" onClick={() => handleDelete(idx)}>削除</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ManageQuestions;