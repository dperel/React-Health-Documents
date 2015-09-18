# React-Health-Documents

Demo Video Link: https://vimeo.com/139706567

This project demonstrates how one could keep track of a patient's health documents using blockchain technology. In the medical world, uncertainty about whether a patient record or lab result is the the true, unmodified document is the cause of much expensive duplicate testing. With a blockchain-based document tracking system, it would be possible for doctors to confirm that their copy of the record matches the one uploaded by a lab or by an earlier physician. 

Frontend build with React JS

Backend in Ruby on Rails 


This project incorporates the relevant features of a blockchain, although it was limited by the time I could put into it and several other factors. 

Health Record Authenticity: I use a SHA-256 hash stored as an attribute of each health record as a fingerprint of its authenticity. When you upload a new document, the app generates a fingerprint and alerts you if it matches the fingerprint of prior uploads. This way, a doctor or patient can determine if the record they have (maybe passed to them from an insurance company or from an outpatient facility's record system) is the same as the one the lab or hospital uploaded. 

Blockchain Proof: I have experience using Chain.com's Bitcoin gem, and I was planning to store the hash in the OP_Return of the Bitcoin transaction to record it forever in the Bitcoin ledger. However, as of the Consensus 2015 conference a week before this project was made, Chain.com was funded by Citi Group and immediately shut off their API. The link is hardcoded as a demonstration to what is possible for now. 

Record Visualization: The BlueButton+ project provides a nice template that allows people to view their XML or CCDA-formatted health documents in a nice HTML format. It did not like some javascript component in my rails app, however, and I have not had enough time to hunt down the bug. The demo video shows what it should look like. 

