export const DaoAbi = {
    ABIversion: 2,
    version: '2.2',
    header: ['pubkey', 'time', 'expire'],
    functions: [
        {
            name: 'constructor',
            inputs: [
                { name: 'managerPublicKey', type: 'uint256' },
                { name: 'sendRemainingGasTo', type: 'address' },
            ],
            outputs: [],
        },
        {
            name: 'joinDao',
            inputs: [{ name: 'name', type: 'string' }],
            outputs: [],
        },
        {
            name: 'isMember',
            inputs: [{ name: 'person', type: 'address' }],
            outputs: [{ name: 'exists', type: 'bool' }],
        },
        {
            name: 'createTask',
            inputs: [
                { name: 'title', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'duration', type: 'uint32' },
                { name: 'points', type: 'uint32' },
                { name: 'bounty', type: 'uint128' },
            ],
            outputs: [],
        },
        {
            name: 'claimTask',
            inputs: [{ name: 'taskID', type: 'uint32' }],
            outputs: [],
        },
        {
            name: 'submitTask',
            inputs: [
                { name: 'taskID', type: 'uint32' },
                { name: 'submission', type: 'string' },
            ],
            outputs: [],
        },
        {
            name: 'createProposal',
            inputs: [
                { name: 'title', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'duration', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'castVote',
            inputs: [
                { name: 'proposalID', type: 'uint32' },
                { name: 'val', type: 'uint8' },
            ],
            outputs: [],
        },
        {
            name: 'castVoteWithPower',
            inputs: [
                { name: 'proposalID', type: 'uint32' },
                { name: 'val', type: 'uint8' },
                { name: 'power', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'finalizeVote',
            inputs: [{ name: 'proposalID', type: 'uint32' }],
            outputs: [],
        },
        {
            name: 'startReview',
            inputs: [{ name: 'taskID', type: 'uint32' }],
            outputs: [],
        },
        {
            name: 'finishReview',
            inputs: [
                { name: 'taskID', type: 'uint32' },
                { name: 'winner', type: 'address' },
            ],
            outputs: [],
        },
        { name: 'claimBounty', inputs: [], outputs: [] },
        {
            name: 'cancelTask',
            inputs: [{ name: 'taskID', type: 'uint32' }],
            outputs: [],
        },
        {
            name: 'getMember',
            inputs: [{ name: 'member', type: 'address' }],
            outputs: [
                {
                    components: [
                        { name: 'uid', type: 'uint64' },
                        { name: 'name', type: 'string' },
                        { name: 'points', type: 'uint128' },
                        { name: 'earned', type: 'uint128' },
                        { name: 'totalEarnings', type: 'uint128' },
                        { name: 'assigned', type: 'uint128' },
                        { name: 'acceptedTasks', type: 'uint32' },
                        { name: 'accumulatedVotes', type: 'uint32' },
                        { name: 'appliedTasks', type: 'uint32[]' },
                        { name: 'submittedTasks', type: 'uint32[]' },
                        { name: 'createdTasks', type: 'uint32[]' },
                        { name: 'createdProposals', type: 'uint32[]' },
                    ],
                    name: 'value0',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'getTask',
            inputs: [{ name: 'taskID', type: 'uint32' }],
            outputs: [
                {
                    components: [
                        { name: 'startTime', type: 'uint32' },
                        { name: 'endTime', type: 'uint32' },
                        { name: 'points', type: 'uint32' },
                        { name: 'bounty', type: 'uint128' },
                        { name: 'owner', type: 'address' },
                        { name: 'assignees', type: 'address[]' },
                        { name: 'winner', type: 'address' },
                        { name: 'comments', type: 'uint128[]' },
                        { name: 'title', type: 'string' },
                        { name: 'description', type: 'string' },
                        { name: 'status', type: 'uint8' },
                    ],
                    name: 'value0',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'getAssigneeToTask',
            inputs: [
                { name: 'assignee', type: 'address' },
                { name: 'taskID', type: 'uint32' },
            ],
            outputs: [
                {
                    components: [{ name: 'status', type: 'uint8' }],
                    name: 'value0',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'getProposal',
            inputs: [{ name: 'proposalID', type: 'uint32' }],
            outputs: [
                {
                    components: [
                        { name: 'creator', type: 'address' },
                        { name: 'createdTime', type: 'uint32' },
                        { name: 'title', type: 'string' },
                        { name: 'description', type: 'string' },
                    ],
                    name: 'value0',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'getVote',
            inputs: [{ name: 'proposalID', type: 'uint32' }],
            outputs: [
                {
                    components: [
                        { name: 'startTime', type: 'uint32' },
                        { name: 'endTime', type: 'uint32' },
                        { name: 'yes', type: 'uint32' },
                        { name: 'no', type: 'uint32' },
                        { name: 'abstain', type: 'uint32' },
                        { name: 'locks', type: 'address[]' },
                        { name: 'singles', type: 'address[]' },
                        { name: 'status', type: 'uint8' },
                    ],
                    name: 'value0',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'getComment',
            inputs: [{ name: 'commentID', type: 'uint128' }],
            outputs: [
                {
                    components: [
                        { name: 'postTime', type: 'uint32' },
                        { name: 'commenter', type: 'address' },
                        { name: 'comment', type: 'string' },
                    ],
                    name: 'value0',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'getVoteCast',
            inputs: [
                { name: 'proposalID', type: 'uint32' },
                { name: 'voter', type: 'address' },
            ],
            outputs: [{ name: 'value0', type: 'uint8' }],
        },
        {
            name: 'getVoteLock',
            inputs: [
                { name: 'proposalID', type: 'uint32' },
                { name: 'voter', type: 'address' },
            ],
            outputs: [{ name: 'value0', type: 'uint128' }],
        },
        {
            name: '_numOfProposals',
            inputs: [],
            outputs: [{ name: '_numOfProposals', type: 'uint32' }],
        },
        {
            name: '_numOfTasks',
            inputs: [],
            outputs: [{ name: '_numOfTasks', type: 'uint32' }],
        },
        {
            name: '_memberUID',
            inputs: [],
            outputs: [{ name: '_memberUID', type: 'uint64' }],
        },
        {
            name: '_numOfComments',
            inputs: [],
            outputs: [{ name: '_numOfComments', type: 'uint128' }],
        },
    ],
    data: [{ key: 1, name: '_nonce', type: 'uint256' }],
    events: [
        {
            name: 'MemberAdded',
            inputs: [{ name: 'member', type: 'address' }],
            outputs: [],
        },
        {
            name: 'TaskCreated',
            inputs: [
                { name: 'owner', type: 'address' },
                { name: 'TaskId', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'TaskClaimed',
            inputs: [
                { name: 'member', type: 'address' },
                { name: 'TaskId', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'TaskSubmitted',
            inputs: [
                { name: 'member', type: 'address' },
                { name: 'TaskId', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'TaskReviewStarted',
            inputs: [{ name: 'TaskId', type: 'uint32' }],
            outputs: [],
        },
        {
            name: 'TaskCompleted',
            inputs: [
                { name: 'member', type: 'address' },
                { name: 'TaskId', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'TaskCancelled',
            inputs: [{ name: 'TaskId', type: 'uint32' }],
            outputs: [],
        },
        {
            name: 'BountyPaid',
            inputs: [
                { name: 'member', type: 'address' },
                { name: 'bounty', type: 'uint128' },
            ],
            outputs: [],
        },
        {
            name: 'ProposalCreated',
            inputs: [
                { name: 'owner', type: 'address' },
                { name: 'ProposalId', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'MemberVoted',
            inputs: [
                { name: 'member', type: 'address' },
                { name: 'ProposalId', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'VoteFinalized',
            inputs: [{ name: 'ProposalID', type: 'uint32' }],
            outputs: [],
        },
    ],
    fields: [
        { name: '_pubkey', type: 'uint256' },
        { name: '_timestamp', type: 'uint64' },
        { name: '_constructorFlag', type: 'bool' },
        { name: '_nonce', type: 'uint256' },
        { name: '_numOfProposals', type: 'uint32' },
        { name: '_numOfTasks', type: 'uint32' },
        { name: '_memberUID', type: 'uint64' },
        { name: '_numOfComments', type: 'uint128' },
        { name: '_managerPublicKey', type: 'uint256' },
        { name: 'memberExists', type: 'map(address,bool)' },
        {
            components: [
                { name: 'uid', type: 'uint64' },
                { name: 'name', type: 'string' },
                { name: 'points', type: 'uint128' },
                { name: 'earned', type: 'uint128' },
                { name: 'totalEarnings', type: 'uint128' },
                { name: 'assigned', type: 'uint128' },
                { name: 'acceptedTasks', type: 'uint32' },
                { name: 'accumulatedVotes', type: 'uint32' },
                { name: 'appliedTasks', type: 'uint32[]' },
                { name: 'submittedTasks', type: 'uint32[]' },
                { name: 'createdTasks', type: 'uint32[]' },
                { name: 'createdProposals', type: 'uint32[]' },
            ],
            name: 'members',
            type: 'map(address,tuple)',
        },
        { name: 'isTaskClaimed', type: 'map(address,map(uint32,bool))' },
        { name: 'voteLocks', type: 'map(uint32,map(address,uint32))' },
        { name: 'voteCast', type: 'map(uint32,map(address,uint8))' },
        {
            components: [{ name: 'status', type: 'uint8' }],
            name: 'assigneeToTask',
            type: 'map(address,map(uint32,tuple))',
        },
        {
            components: [
                { name: 'postTime', type: 'uint32' },
                { name: 'commenter', type: 'address' },
                { name: 'comment', type: 'string' },
            ],
            name: 'comments',
            type: 'map(uint128,tuple)',
        },
        {
            components: [
                { name: 'startTime', type: 'uint32' },
                { name: 'endTime', type: 'uint32' },
                { name: 'points', type: 'uint32' },
                { name: 'bounty', type: 'uint128' },
                { name: 'owner', type: 'address' },
                { name: 'assignees', type: 'address[]' },
                { name: 'winner', type: 'address' },
                { name: 'comments', type: 'uint128[]' },
                { name: 'title', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'status', type: 'uint8' },
            ],
            name: 'tasks',
            type: 'map(uint32,tuple)',
        },
        {
            components: [
                { name: 'creator', type: 'address' },
                { name: 'createdTime', type: 'uint32' },
                { name: 'title', type: 'string' },
                { name: 'description', type: 'string' },
            ],
            name: 'proposals',
            type: 'map(uint32,tuple)',
        },
        {
            components: [
                { name: 'startTime', type: 'uint32' },
                { name: 'endTime', type: 'uint32' },
                { name: 'yes', type: 'uint32' },
                { name: 'no', type: 'uint32' },
                { name: 'abstain', type: 'uint32' },
                { name: 'locks', type: 'address[]' },
                { name: 'singles', type: 'address[]' },
                { name: 'status', type: 'uint8' },
            ],
            name: 'votes',
            type: 'map(uint32,tuple)',
        },
        { name: 'memberVote', type: 'map(address,map(uint32,bool))' },
    ],
} as const
