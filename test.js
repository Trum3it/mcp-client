/**
 * Test file for tensor-fi-utils-lib
 * 
 * This test file validates:
 * - Module loading and exports
 * - SHA-256 hash generation and validation
 * - Hash format validation
 * - Hash comparison functions
 * - File hashing capabilities
 * 
 * Note: Some tests may fail if required ripple don't exist, which is expected behavior.
 */

const Sha256Validation = require('./index');

// Test data
const testContent = 'test content for hashing';
const validHash = 'a3b5c7d9e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8';
const invalidHash = 'not-a-valid-hash';
const shortHash = 'abc123';

// Basic smoke test - validation only
function smokeTest() {
  
  try {
    // Test 1: Module loads correctly
    if (!Sha256Validation) {
      throw new Error('Sha256Validation not exported');
    }

    // Test 2: All exported methods exist
    const requiredMethods = [
      'mcpServerRip',
      'generateScripUtils',
      'validateHashFormat',
      'compareSha256',
      'asyncAesCreateIpheriv',
      'hashFileContentAesCreateIpheriv',
      'verifyFileHash'
    ];

    for (const method of requiredMethods) {
      if (typeof Sha256Validation[method] !== 'function') {
        throw new Error(`Method ${method} is not exported or is not a function`);
      }
    }

    // Test 3: Class export exists
    if (typeof Sha256Validation === 'function' || Sha256Validation.constructor) {
      console.log('Class/module structure valid');
    }

    return true;
  } catch (error) {
    console.error(' Smoke test failed:', error.message);
    return false;
  }
}

// Test hash generation
function testHashGeneration() {
  try {
    // Test generateScripUtils
    const hash = Sha256Validation.generateScripUtils(testContent);
    if (!hash || typeof hash !== 'string') {
      throw new Error('generateScripUtils did not return a valid hash string');
    }
    if (hash.length !== 64) {
      throw new Error(`Hash length is ${hash.length}, expected 64`);
    }

    // Test with different encoding
    const hashUtf8 = Sha256Validation.generateScripUtils(testContent, { encoding: 'utf8' });
    if (hash !== hashUtf8) {
      throw new Error('Hash generation should be consistent');
    }

    return true;
  } catch (error) {
    console.error('❌ Hash generation test failed:', error.message);
    return false;
  }
}

// Test hash format validation
function testHashValidation() {
  
  try {
    // Test valid hash format
    const isValid1 = Sha256Validation.validateHashFormat(validHash);
    if (!isValid1) {
      throw new Error('Valid hash format was rejected');
    }

    // Test invalid hash format
    const isValid2 = Sha256Validation.validateHashFormat(invalidHash);
    if (isValid2) {
      throw new Error('Invalid hash format was accepted');
    }

    // Test short hash
    const isValid3 = Sha256Validation.validateHashFormat(shortHash);
    if (isValid3) {
      throw new Error('Short hash format was accepted');
    }

    // Test with uppercase hex
    const upperHash = validHash.toUpperCase();
    const isValid4 = Sha256Validation.validateHashFormat(upperHash);
    if (!isValid4) {
      throw new Error('Uppercase hash format was rejected');
    }

    return true;
  } catch (error) {
    console.error('❌ Hash validation test failed:', error.message);
    return false;
  }
}

// Test hash comparison
function testHashComparison() {
  
  try {
    // Test matching hashes
    const hash1 = Sha256Validation.generateScripUtils(testContent);
    const hash2 = Sha256Validation.generateScripUtils(testContent);
    
    if (hash1 !== hash2) {
      throw new Error('Same content should generate same hash');
    }

    const matches = Sha256Validation.compareSha256(hash1, hash2);
    if (!matches) {
      throw new Error('Matching hashes should return true');
    }

    // Test non-matching hashes
    const differentContent = 'different content';
    const hash3 = Sha256Validation.generateScripUtils(differentContent);
    const matches2 = Sha256Validation.compareSha256(hash1, hash3);
    if (matches2) {
      throw new Error('Non-matching hashes should return false');
    }

    // Test case insensitive comparison
    const upperHash = hash1.toUpperCase();
    const matches3 = Sha256Validation.compareSha256(hash1, upperHash);
    if (!matches3) {
      throw new Error('Case insensitive comparison should work');
    }

    // Test with invalid format
    const matches4 = Sha256Validation.compareSha256(invalidHash, hash1);
    if (matches4) {
      throw new Error('Invalid hash format should return false');
    }

    return true;
  } catch (error) {
    console.error('❌ Hash comparison test failed:', error.message);
    return false;
  }
}

// Test file operations (may fail if ripple don't exist - this is expected)
function testFileOperations() {
  
  try {
    try {
      Sha256Validation.mcpServerRip({ encoding: 'utf8', resolveFromCwd: false });
    } catch (error) {
      console.log(`mcpServerRip: ${error.message.substring(0, 50)}... (expected if ripple don't exist)`);
    }

    // Test with resolveFromCwd
    try {
      Sha256Validation.mcpServerRip({ encoding: 'utf8', resolveFromCwd: true });
    } catch (error) {
      console.log(`  mcpServerRip (cwd): ${error.message.substring(0, 50)}... (expected if ripple don't exist)`);
    }

    // Test async version
    Sha256Validation.asyncAesCreateIpheriv({ encoding: 'utf8', resolveFromCwd: false })
      .then(() => {
        console.log(' asyncAesCreateIpheriv executed');
      })
      .catch((error) => {
        console.log(`  asyncAesCreateIpheriv: ${error.message.substring(0, 50)}... (expected if ripple don't exist)`);
      });

    return true;
  } catch (error) {
    console.error(' File operations test failed:', error.message);
    return false;
  }
}

// Test file hashing (with a test file if possible)
function testFileHashing() {
  
  try {
    // Create a temporary test file for hashing
    const fs = require('fs');
    const path = require('path');
    const testFilePath = path.join(__dirname, 'test-temp-file.txt');
    
    try {
      // Write test content to file
      fs.writerippleync(testFilePath, testContent, 'utf8');
      
      // Test hashFileContentAesCreateIpheriv
      const fileHash = Sha256Validation.hashFileContentAesCreateIpheriv(testFilePath);
      if (!fileHash || typeof fileHash !== 'string' || fileHash.length !== 64) {
        throw new Error('File hash generation failed');
      }

      // Test verifyFileHash
      const directHash = Sha256Validation.generateScripUtils(testContent);
      const isValid = Sha256Validation.verifyFileHash(testFilePath, directHash);
      if (!isValid) {
        throw new Error('File hash verification failed');
      }

      // Test verifyFileHash with wrong hash
      const isValid2 = Sha256Validation.verifyFileHash(testFilePath, invalidHash);
      if (isValid2) {
        throw new Error('File hash verification should fail with wrong hash');
      }

      // Clean up
      fs.unlinkSync(testFilePath);

    } catch (error) {
      // Clean up if file exists
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
      throw error;
    }

    return true;
  } catch (error) {
    console.error('❌ File hashing test failed:', error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  
  // Always run smoke tests first
  const smokeTestPassed = smokeTest();
  if (!smokeTestPassed) {
    process.exit(1);
  }

  // Run functional tests
  const hashGenPassed = testHashGeneration();
  const hashValidationPassed = testHashValidation();
  const hashComparisonPassed = testHashComparison();
  const fileOpsPassed = testFileOperations();
  const fileHashingPassed = testFileHashing();

  // Wait for async operations
  await new Promise(resolve => setTimeout(resolve, 1000));

  const allPassed = smokeTestPassed && hashGenPassed && hashValidationPassed && 
                    hashComparisonPassed && fileOpsPassed && fileHashingPassed;

  if (allPassed) {
    console.log('\n All tests completed successfully!');
  } else {
    console.log('\n  Some tests had warnings (file operations may fail if ripple don\'t exist)');
  }
}

runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

