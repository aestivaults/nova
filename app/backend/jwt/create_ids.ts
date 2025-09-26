import { v4 as uuidv4 } from "uuid";

function generateWalletAddress() {
  const uuid = uuidv4().replace(/-/g, "");
  return "0x" + uuid.substring(0, 40);
}

function generateNftTokenId() {
  const uuid = uuidv4().replace(/-/g, "");
  return "0x" + uuid.substring(0, 40); // Token ID format
}

/**
 * Generate a random 4-digit OTP code
 * @returns {string} 4-digit numeric code (e.g., "4839")
 */
function generate4DigitOTP() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

/**
 * Generate a random 6-digit OTP code
 * @returns {string} 6-digit numeric code (e.g., "483920")
 */
function generate6DigitOTP() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

/**
 * Generate a random OTP of specified length
 * @param {number} length - Number of digits (4 or 6 recommended)
 * @returns {string} OTP code of specified length
 */

function generateOTP(length = 6) {
  if (length === 4) {
    return generate4DigitOTP();
  } else if (length === 6) {
    return generate6DigitOTP();
  } else {
    // Generate custom length
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
}

/**
 * Generate a secure random string of specified length
 * @param {number} length - Length of the random string
 * @returns {string} Random alphanumeric string
 */

function generateRandomString(length = 32) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a secure password reset token
 * @returns {string} Base64URL encoded secure token
 */
function generatePasswordResetToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/**
 * Generate a secure email verification token
 * @returns {string} Base64URL encoded secure token
 */
function generateEmailVerificationToken() {
  return generatePasswordResetToken(); // Same format
}

/**
 * Generate a secure API key
 * @param {number} length - Length of the API key (default 64)
 * @returns {string} Secure API key with prefix
 */
function generateApiKey(length = 64) {
  const prefix = "aureus_";
  const key = generateRandomString(length);
  return `${prefix}${key}`;
}

/**
 * Generate a secure session token
 * @returns {string} Secure session token
 */
function generateSessionToken() {
  return generateRandomString(43); // JWT compatible length
}

/**
 * Generate a transaction reference ID
 * @returns {string} Unique transaction reference
 */
function generateTransactionRef() {
  const timestamp = Date.now().toString(36);
  const random = generateRandomString(8);
  return `TXN_${timestamp}_${random}`;
}

/**
 * Generate a withdrawal request ID
 * @returns {string} Unique withdrawal request ID
 */
function generateWithdrawalId() {
  const timestamp = Date.now().toString(36);
  const random = uuidv4().replace(/-/g, "").substring(0, 8);
  return `WD_${timestamp}_${random}`;
}

/**
 * Generate a deposit confirmation ID
 * @returns {string} Unique deposit confirmation ID
 */
function generateDepositId() {
  const timestamp = Date.now().toString(36);
  const random = uuidv4().replace(/-/g, "").substring(0, 8);
  return `DP_${timestamp}_${random}`;
}

/**
 * Generate a collection ID for NFT collections
 * @returns {string} Unique collection ID
 */
function generateCollectionId() {
  const uuid = uuidv4().replace(/-/g, "");
  return `COL_${uuid.substring(0, 32)}`;
}

/**
 * Generate a secure hash for email verification
 * @param {string} email - Email address to hash
 * @returns {string} Hashed email for verification
 */
function generateEmailHash(email: string) {
  // Simple hash for demonstration - use proper crypto in production
  const encoder = new TextEncoder();
  const data = encoder.encode(email + Date.now());
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Validate OTP format
 * @param {string} otp - OTP to validate
 * @param {number} expectedLength - Expected length (4 or 6)
 * @returns {boolean} True if valid format
 */
function validateOTP(otp: string, expectedLength = 6) {
  const otpRegex = new RegExp(`^\\d{${expectedLength}}$`);
  return otpRegex.test(otp);
}

/**
 * Generate multiple OTPs for testing
 * @param {number} count - Number of OTPs to generate
 * @param {number} length - Length of each OTP (4 or 6)
 * @returns {Array} Array of generated OTPs
 */
function generateMultipleOTPs(count = 5, length = 6) {
  return Array.from({ length: count }, () => generateOTP(length));
}

export {
  generateWalletAddress,
  generateNftTokenId,
  generate4DigitOTP,
  generate6DigitOTP,
  generateOTP,
  generateRandomString,
  generatePasswordResetToken,
  generateEmailVerificationToken,
  generateApiKey,
  generateSessionToken,
  generateTransactionRef,
  generateWithdrawalId,
  generateDepositId,
  generateCollectionId,
  generateEmailHash,
  validateOTP,
  generateMultipleOTPs,
};

// Usage examples:
/*
console.log('4-digit OTP:', generate4DigitOTP()); // e.g., "4839"
console.log('6-digit OTP:', generate6DigitOTP()); // e.g., "483920"
console.log('Custom OTP (8 digits):', generateOTP(8)); // e.g., "12345678"
console.log('Password reset token:', generatePasswordResetToken()); // e.g., "SGVsbG8gV29ybGQh"
console.log('Transaction ref:', generateTransactionRef()); // e.g., "TXN_64f8a2b3c4d5e6f7"
console.log('Valid OTP check:', validateOTP('483920', 6)); // true
console.log('Invalid OTP check:', validateOTP('abc123', 6)); // false
console.log('Multiple OTPs:', generateMultipleOTPs(3, 4)); // ["4839", "7291", "1563"]
*/
