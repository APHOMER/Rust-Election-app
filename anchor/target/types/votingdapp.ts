export type Votingdapp = {
  "version": "0.1.0",
  "name": "votingdapp",
  "instructions": [
    {
      "name": "initializePoll",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poll",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "pollId",
          "type": "u64"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "pollStart",
          "type": "u64"
        },
        {
          "name": "pollEnd",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeCandidate",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poll",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "candidate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "candidateName",
          "type": "string"
        },
        {
          "name": "pollId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "poll",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "candidate",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "candidateName",
          "type": "string"
        },
        {
          "name": "pollId",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "candidate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "candidateName",
            "type": "string"
          },
          {
            "name": "candidateVote",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poll",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pollId",
            "type": "u64"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "pollStart",
            "type": "u64"
          },
          {
            "name": "pollEnd",
            "type": "u64"
          },
          {
            "name": "candidateAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const IDL: Votingdapp = {
  "version": "0.1.0",
  "name": "votingdapp",
  "instructions": [
    {
      "name": "initializePoll",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poll",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "pollId",
          "type": "u64"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "pollStart",
          "type": "u64"
        },
        {
          "name": "pollEnd",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeCandidate",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poll",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "candidate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "candidateName",
          "type": "string"
        },
        {
          "name": "pollId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "poll",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "candidate",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "candidateName",
          "type": "string"
        },
        {
          "name": "pollId",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "candidate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "candidateName",
            "type": "string"
          },
          {
            "name": "candidateVote",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poll",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pollId",
            "type": "u64"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "pollStart",
            "type": "u64"
          },
          {
            "name": "pollEnd",
            "type": "u64"
          },
          {
            "name": "candidateAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
