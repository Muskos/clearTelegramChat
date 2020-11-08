const QUERY = {
  CREATE_MESSAGES_BD:
    'CREATE TABLE IF NOT EXISTS messages(chatId text, messageId text, createdAt datetime, deleteAt text)',
  SELECT_WITH_TIMEOUT:
    'SELECT chatId, messageId, deleteAt FROM messages WHERE deleteAt IS NOT NULL',
  GET_CHAT_ID: 'SELECT chatId from messages',
  DELETE_BY_CHAT_ID: 'DELETE from messages WHERE chatId = ?',
  DELETE_MESSAGE: 'DELETE from messages WHERE chatId = ? AND messageId = ?',
  SELECT_BY_TIMEOUT:
    'SELECT chatId, messageId, createdAt FROM messages WHERE chatId = ?',
  SELECT_BY_CHAT_ID: 'SELECT messageId FROM messages WHERE chatId = ?',
  INSERT_MESSAGE:
    'INSERT INTO messages(chatId, messageId, createdAt, deleteAt) VALUES(?,?,?,?)',
  CREATE_SETTINGS_DB:
    'CREATE TABLE IF NOT EXISTS settings(chatId text, setting text, value text)',
  GET_SETTINGS: 'SELECT chatId, setting, value FROM settings WHERE setting = ?',
  INSERT_SETTINGS:
    'INSERT INTO settings(chatId, setting, value) VALUES(?, ?, ?)',
  SELECT_CHAT_SETTINGS:
    'SELECT chatId, setting, value FROM settings WHERE chatId = ? AND setting = ?',
  UPDATE_SETTINGS:
    'UPDATE settings SET value = ? WHERE chatId = ? AND setting = ?'
};

module.exports = {
  QUERY
};
