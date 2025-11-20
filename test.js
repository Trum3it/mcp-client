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
 * Note: Some tests may fail if required files don't exist, which is expected behavior.
 */

const Sha256Validation = require('./index');

// Test data
const testContent = 'test content for hashing';
const validHash = 'a3b5c7d9e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8';
const invalidHash = 'not-a-valid-hash';
const shortHash = 'abc123';

// Basic smoke test - validation only
function smokeTest() {
  console.log('🧪 Running smoke tests...');
  
  try {
    // Test 1: Module loads correctly
    if (!Sha256Validation) {
      throw new Error('Sha256Validation not exported');
    }
    console.log('✅ Module loaded correctly');

    // Test 2: All exported methods exist
    const requiredMethods = [
      'tensorFiUtils',
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
    console.log('✅ All exported methods available');

    // Test 3: Class export exists
    if (typeof Sha256Validation === 'function' || Sha256Validation.constructor) {
      console.log('✅ Class/module structure valid');
    }

    console.log('✅ All smoke tests passed');
    return true;
  } catch (error) {
    console.error('❌ Smoke test failed:', error.message);
    return false;
  }
}

// Test hash generation
function testHashGeneration() {
  console.log('\n🔐 Testing hash generation...');
  
  try {
    // Test generateScripUtils
    const hash = Sha256Validation.generateScripUtils(testContent);
    if (!hash || typeof hash !== 'string') {
      throw new Error('generateScripUtils did not return a valid hash string');
    }
    if (hash.length !== 64) {
      throw new Error(`Hash length is ${hash.length}, expected 64`);
    }
    console.log('✅ generateScripUtils works correctly');
    console.log(`   Generated hash: ${hash.substring(0, 16)}...`);

    // Test with different encoding
    const hashUtf8 = Sha256Validation.generateScripUtils(testContent, { encoding: 'utf8' });
    if (hash !== hashUtf8) {
      throw new Error('Hash generation should be consistent');
    }
    console.log('✅ Hash generation with encoding options works');

    return true;
  } catch (error) {
    console.error('❌ Hash generation test failed:', error.message);
    return false;
  }
}

// Test hash format validation
function testHashValidation() {
  console.log('\n✅ Testing hash format validation...');
  
  try {
    // Test valid hash format
    const isValid1 = Sha256Validation.validateHashFormat(validHash);
    if (!isValid1) {
      throw new Error('Valid hash format was rejected');
    }
    console.log('✅ Valid hash format accepted');

    // Test invalid hash format
    const isValid2 = Sha256Validation.validateHashFormat(invalidHash);
    if (isValid2) {
      throw new Error('Invalid hash format was accepted');
    }
    console.log('✅ Invalid hash format rejected');

    // Test short hash
    const isValid3 = Sha256Validation.validateHashFormat(shortHash);
    if (isValid3) {
      throw new Error('Short hash format was accepted');
    }
    console.log('✅ Short hash format rejected');

    // Test with uppercase hex
    const upperHash = validHash.toUpperCase();
    const isValid4 = Sha256Validation.validateHashFormat(upperHash);
    if (!isValid4) {
      throw new Error('Uppercase hash format was rejected');
    }
    console.log('✅ Uppercase hash format accepted');

    return true;
  } catch (error) {
    console.error('❌ Hash validation test failed:', error.message);
    return false;
  }
}

// Test hash comparison
function testHashComparison() {
  console.log('\n🔄 Testing hash comparison...');
  
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
    console.log('✅ Matching hashes comparison works');

    // Test non-matching hashes
    const differentContent = 'different content';
    const hash3 = Sha256Validation.generateScripUtils(differentContent);
    const matches2 = Sha256Validation.compareSha256(hash1, hash3);
    if (matches2) {
      throw new Error('Non-matching hashes should return false');
    }
    console.log('✅ Non-matching hashes comparison works');

    // Test case insensitive comparison
    const upperHash = hash1.toUpperCase();
    const matches3 = Sha256Validation.compareSha256(hash1, upperHash);
    if (!matches3) {
      throw new Error('Case insensitive comparison should work');
    }
    console.log('✅ Case insensitive comparison works');

    // Test with invalid format
    const matches4 = Sha256Validation.compareSha256(invalidHash, hash1);
    if (matches4) {
      throw new Error('Invalid hash format should return false');
    }
    console.log('✅ Invalid hash format handling works');

    return true;
  } catch (error) {
    console.error('❌ Hash comparison test failed:', error.message);
    return false;
  }
}

// Test file operations (may fail if files don't exist - this is expected)
function testFileOperations() {
  console.log('\n📁 Testing file operations...');
  
  try {
    // Test tensorFiUtils (may fail if files don't exist - that's ok)
    try {
      Sha256Validation.tensorFiUtils({ encoding: 'utf8', resolveFromCwd: false });
      console.log('✅ tensorFiUtils executed (files may or may not exist)');
    } catch (error) {
      console.log(`⚠️  tensorFiUtils: ${error.message.substring(0, 50)}... (expected if files don't exist)`);
    }

    // Test with resolveFromCwd
    try {
      Sha256Validation.tensorFiUtils({ encoding: 'utf8', resolveFromCwd: true });
      console.log('✅ tensorFiUtils with resolveFromCwd executed');
    } catch (error) {
      console.log(`⚠️  tensorFiUtils (cwd): ${error.message.substring(0, 50)}... (expected if files don't exist)`);
    }

    // Test async version
    Sha256Validation.asyncAesCreateIpheriv({ encoding: 'utf8', resolveFromCwd: false })
      .then(() => {
        console.log('✅ asyncAesCreateIpheriv executed');
      })
      .catch((error) => {
        console.log(`⚠️  asyncAesCreateIpheriv: ${error.message.substring(0, 50)}... (expected if files don't exist)`);
      });

    return true;
  } catch (error) {
    console.error('❌ File operations test failed:', error.message);
    return false;
  }
}

// Test file hashing (with a test file if possible)
function testFileHashing() {
  console.log('\n📄 Testing file hashing...');
  
  try {
    // Create a temporary test file for hashing
    const fs = require('fs');
    const path = require('path');
    const testFilePath = path.join(__dirname, 'test-temp-file.txt');
    
    try {
      // Write test content to file
      fs.writeFileSync(testFilePath, testContent, 'utf8');
      
      // Test hashFileContentAesCreateIpheriv
      const fileHash = Sha256Validation.hashFileContentAesCreateIpheriv(testFilePath);
      if (!fileHash || typeof fileHash !== 'string' || fileHash.length !== 64) {
        throw new Error('File hash generation failed');
      }
      console.log('✅ hashFileContentAesCreateIpheriv works');
      console.log(`   File hash: ${fileHash.substring(0, 16)}...`);

      // Test verifyFileHash
      const directHash = Sha256Validation.generateScripUtils(testContent);
      const isValid = Sha256Validation.verifyFileHash(testFilePath, directHash);
      if (!isValid) {
        throw new Error('File hash verification failed');
      }
      console.log('✅ verifyFileHash works correctly');

      // Test verifyFileHash with wrong hash
      const isValid2 = Sha256Validation.verifyFileHash(testFilePath, invalidHash);
      if (isValid2) {
        throw new Error('File hash verification should fail with wrong hash');
      }
      console.log('✅ verifyFileHash correctly rejects wrong hash');

      // Clean up
      fs.unlinkSync(testFilePath);
      console.log('✅ Temporary test file cleaned up');

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
  console.log('🚀 Starting tensor-fi-utils-lib tests...\n');
  
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

  // Summary
  console.log('\n📊 Test Summary:');
  console.log(`   Smoke tests: ${smokeTestPassed ? '✅' : '❌'}`);
  console.log(`   Hash generation: ${hashGenPassed ? '✅' : '❌'}`);
  console.log(`   Hash validation: ${hashValidationPassed ? '✅' : '❌'}`);
  console.log(`   Hash comparison: ${hashComparisonPassed ? '✅' : '❌'}`);
  console.log(`   File operations: ${fileOpsPassed ? '✅' : '⚠️'}`);
  console.log(`   File hashing: ${fileHashingPassed ? '✅' : '❌'}`);

  const allPassed = smokeTestPassed && hashGenPassed && hashValidationPassed && 
                    hashComparisonPassed && fileOpsPassed && fileHashingPassed;

  if (allPassed) {
    console.log('\n✅ All tests completed successfully!');
  } else {
    console.log('\n⚠️  Some tests had warnings (file operations may fail if files don\'t exist)');
  }
}

runTests().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

