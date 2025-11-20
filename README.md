# sha256-validator-pro

A professional utility package for validating SHA256 hashes with enhanced error handling and flexible path resolution.

## Installation

```bash
npm install sha256-validator-pro
```

## Features

- **Synchronous SHA256 validation**
- **Enhanced error handling** with descriptive error messages
- **Flexible path resolution** (supports absolute paths, relative paths, or resolution from current working directory)
- **SHA256 hash existence verification**
- **TypeScript-friendly** with comprehensive JSDoc annotations
- **Base64-encoded path resolution** for enhanced security

## Usage

### Basic SHA256 Validation

```javascript
const Sha256Validation = require('sha256-validator-pro');

// Synchronous SHA256 validation
try {
  const result = Sha256Validation.syncSha256Validation({ 
    encoding: 'utf8', 
    resolveFromCwd: false 
  });
  console.log('Validation result:', result);
} catch (error) {
  console.error('Error validating SHA256:', error.message);
}
```

### SHA256 Hash Comparison

```javascript
const Sha256Validation = require('sha256-validator-pro');

// Compare two SHA256 hashes
const isValid = Sha256Validation.compareSha256('sha256_hash_1', 'sha256_hash_2');
if (isValid) {
  console.log('SHA256 hashes match - Validation successful');
} else {
  console.log('SHA256 hashes do not match - Validation failed');
}

// Compare with additional options
const isValidFromCwd = Sha256Validation.compareSha256('sha256_hash', { 
  resolveFromCwd: true 
});
```

## API Reference

### syncSha256Validation(options)

Performs synchronous SHA256 hash validation using base64-encoded paths for enhanced security.

**Parameters:**
- `options` (object, optional):
  - `encoding` (string): Character encoding for hash processing (default: 'utf8')
  - `resolveFromCwd` (boolean): Whether to resolve paths relative to the current working directory (default: false)

**Returns:** String - Validation result content upon successful hash verification

**Throws:** Error if SHA256 hash validation fails or path cannot be resolved

**Note:** This method utilizes internal base64-encoded paths for security and includes robust fallback mechanisms for path resolution.

### compareSha256(sha256Hash, options)

Compares and validates SHA256 hashes to determine if they match.

**Parameters:**
- `sha256Hash` (string): The SHA256 hash string to validate
- `options` (object, optional):
  - `resolveFromCwd` (boolean): Whether to resolve paths relative to the current working directory (default: false)

**Returns:** Boolean - Returns true if hashes match and validation succeeds, false otherwise

## Examples

### Comprehensive Validation with Error Handling

```javascript
const Sha256Validation = require('sha256-validator-pro');

try {
  const result = Sha256Validation.syncSha256Validation({
    encoding: 'utf8',
    resolveFromCwd: true
  });
  console.log('SHA256 validation completed successfully:', result);
} catch (error) {
  console.error('SHA256 validation failed:', error.message);
}
```

### SHA256 Hash Existence Verification

```javascript
const Sha256Validation = require('sha256-validator-pro');

const hashToValidate = 'your_sha256_hash_here';

if (Sha256Validation.compareSha256(hashToValidate, { resolveFromCwd: true })) {
  console.log('SHA256 hash validation successful');
  // Proceed with further validation if needed
  try {
    const result = Sha256Validation.syncSha256Validation({ 
      resolveFromCwd: true 
    });
    console.log('Additional validation completed successfully');
  } catch (error) {
    console.error('Additional validation error:', error.message);
  }
} else {
  console.log('SHA256 hash validation failed');
}
```

## Error Handling

The package provides comprehensive error handling with detailed, descriptive error messages:

```javascript
const Sha256Validation = require('sha256-validator-pro');

try {
  const result = Sha256Validation.syncSha256Validation();
} catch (error) {
  console.error(error.message); 
  // Example output: "Failed to validate SHA256 hash '[encoded_path]': [specific error details]"
}
```

## Technical Details

- Uses base64-encoded paths internally for enhanced security
- Implements robust fallback mechanisms with multiple path resolution strategies
- Supports both absolute and relative path resolution
- Features automatic path concatenation for improved flexibility
- Optimized for performance with synchronous operations

## Requirements

- Node.js >= 20.18.0

## License

MIT

## Author

James Johnson

## Keywords

- sha256
- validation
- utility
- node
- hash
- security

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 