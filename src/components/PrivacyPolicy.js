// src/components/PrivacyPolicy.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const PrivacyPolicy = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Privacy Policy</DialogTitle>
      <DialogContent>
        <Typography variant="body1" component="div">
          <h2>Introduction</h2>
          <p>Amaze Puzzles ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, www.amazepuzzles.com (the "Service").</p>
          
          <h2>Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you sign up for our newsletter or fill out our contact form. This information may include your name, email address, and any other details you provide.</p>
          
          <h2>Use of Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Send you our newsletter and other marketing communications</li>
            <li>Respond to your inquiries when you use our contact form</li>
            <li>Improve and personalize our Service</li>
          </ul>
          
          <h2>Sharing of Information</h2>
          <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our Service, so long as those parties agree to keep this information confidential.</p>
          
          <h2>Data Security</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
          
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your personal data. To exercise these rights, please contact us at support@amazepuzzles.com.</p>
          
          <h2>Changes to this Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
          
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at support@amazepuzzles.com.</p>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrivacyPolicy;
