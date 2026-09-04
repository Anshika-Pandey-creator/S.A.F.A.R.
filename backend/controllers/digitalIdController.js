const { dbStore } = require('../config/db');
const { blockchainInstance } = require('../services/blockchainService');

function getDigitalId(req, res) {
  const { id } = req.params;
  const digitalId = dbStore.findOne('digitalIds', (d) => d.id === id || d.touristId === id);

  if (!digitalId) {
    return res.status(404).json({ success: false, error: 'Digital Tourist ID not found' });
  }

  const tourist = dbStore.findOne('tourists', (t) => t.touristId === digitalId.touristId);

  // Cross verify with blockchain ledger
  const auditResult = blockchainInstance.verifyDigitalID(digitalId.touristId, digitalId.digitalIdHash);

  return res.json({
    success: true,
    digitalId,
    tourist,
    blockchainAudit: auditResult
  });
}

function verifyDigitalIdPublic(req, res) {
  const { touristId, digitalIdHash } = req.body;

  if (!touristId && !digitalIdHash) {
    return res.status(400).json({ success: false, error: 'Tourist ID or Digital ID Hash required for verification' });
  }

  const digitalId = dbStore.findOne(
    'digitalIds',
    (d) => d.touristId === touristId || d.digitalIdHash === digitalIdHash
  );

  if (!digitalId) {
    return res.json({
      success: true,
      verified: false,
      status: 'INVALID / NOT FOUND',
      message: '✗ Digital ID hash not found on SafeTour NE Prototype Blockchain Ledger.'
    });
  }

  const tourist = dbStore.findOne('tourists', (t) => t.touristId === digitalId.touristId);
  const auditResult = blockchainInstance.verifyDigitalID(digitalId.touristId, digitalId.digitalIdHash);

  return res.json({
    success: true,
    verified: auditResult.verified,
    status: auditResult.verified ? 'VALID' : 'INVALID / TAMPERED',
    message: auditResult.verified
      ? '✓ Digital Tourist ID Authenticity Cryptographically Verified on Prototype Blockchain Ledger.'
      : `✗ Verification Failed: ${auditResult.reason}`,
    digitalId,
    tourist: tourist
      ? {
          touristId: tourist.touristId,
          fullName: tourist.fullName,
          nationality: tourist.nationality,
          destination: tourist.destination,
          travelValidity: `${tourist.travelStartDate} to ${tourist.travelEndDate}`
        }
      : null,
    blockchainAudit: auditResult
  });
}

module.exports = {
  getDigitalId,
  verifyDigitalIdPublic
};
