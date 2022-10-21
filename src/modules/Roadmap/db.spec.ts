import initApi from "../../initApi";
import { RoadmapModel } from "./db";

async function getRoadmapModel(): Promise<RoadmapModel> {
    const apiModule = await initApi({
        Roadmap: { enabled: true, require: ['CoreUnit'] },
        CoreUnit: { enabled: true }
    });

    const db = apiModule.datasource;
    return db.module<RoadmapModel>('Roadmap');
};

it('return a list of roadmaps', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getRoadmaps(undefined);
    expect(entry.length).toBeGreaterThan(0);
});

it('returns a list of roadmaps under a coreUnit id', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getRoadmaps(1);
    expect(entry.length).toBeGreaterThan(0);
})

it('return a list of roadmaps with roadmapStatus InProgress', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getRoadmap('roadmapStatus', 'InProgress');
    expect(entry[0].roadmapStatus).toEqual('InProgress')
})

it('return a list of roadmaps with strategicInitiative true', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getRoadmap('strategicInitiative', true);
    expect(entry[0].strategicInitiative).toEqual(true)
});

it('returns a list of roadmapStakeholders', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getRoadmapStakeholders(undefined);
    expect(entry.length).toBeGreaterThan(0);
});

it('returns a list of roadmapStakeholders with roadmapId', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getRoadmapStakeholders('0');
    expect(entry.length).toBeGreaterThan(0);
});

it('returns a list of roadmapStakeholders with stakeholderId', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getRoadmapStakeholder('stakeholderId', '1');
    expect(entry.length).toBeGreaterThan(0)
});

it('returns a list of stakeholderRoles', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getStakeholderRoles(undefined);
    expect(entry.length).toBeGreaterThan(0)
});

it('returns stakeholder role searched by ID or by name', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getStakeholderRole('id', '0');
    const entry1 = await model.getStakeholderRole('stakeholderRoleName', 'Facilitator');
    expect(entry.length).toBeGreaterThan(0)
    expect(entry1.length).toBeGreaterThan(0)
});

it('returns list of stakeholders with and without ID param', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getStakeholders(undefined);
    const entry1 = await model.getStakeholders('1');
    expect(entry.length).toBeGreaterThan(0)
    expect(entry1.length).toBeGreaterThan(0)
});

it('returns list of stakeholders with stakeholderCuCode param', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getStakeholder('stakeholderCuCode', "SES-001");
    expect(entry.length).toBeGreaterThan(0);
});

it('returns list of roadmapOutputs with ID and undefined param', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getRoadmapOutputs(undefined);
    const entry1 = await model.getRoadmapOutputs('0');
    expect(entry.length).toBeGreaterThan(0)
    expect(entry1.length).toBeGreaterThan(0)
});

it('returns list of roadmapOutputs with outputId', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getRoadmapOutput('outputId', '0');
    expect(entry.length).toBeGreaterThan(0);
});

it('returns list of outputs with id or undefined param', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getOutputs(undefined);
    const entry1 = await model.getOutputs('0');
    expect(entry.length).toBeGreaterThan(0);
    expect(entry1.length).toBeGreaterThan(0);
});

it('returns output with outputDate filter', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getOutput('outputDate', '2022-03-14');
    console.log(entry)
    expect(entry.length).toBeGreaterThan(0)
});

it('returns list of outputTypes with ID or undefined params', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getOutputTypes(undefined);
    const entry1 = await model.getOutputTypes('0');
    expect(entry.length).toBeGreaterThan(0);
    expect(entry1.length).toBeGreaterThan(0);
});

it('returns list of outputTypes with outputType param', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getOutputType('outputType', 'Video');
    expect(entry.length).toBeGreaterThan(0);
});

it('returns list of milestones with id or undefined param', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getMilestones(undefined);
    const entry1 = await model.getMilestones('0');
    expect(entry.length).toBeGreaterThan(0);
    expect(entry1.length).toBeGreaterThan(0);
});

it('returns list of milestones where roadmapId is 0', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getMilestone('roadmapId', '0');
    expect(entry.length).toBeGreaterThan(0);
});

it('returns list of tasks with ID or undefined param', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getTasks(undefined);
    const entry1 = await model.getTasks('0');
    expect(entry.length).toBeGreaterThan(0);
    expect(entry1.length).toBeGreaterThan(0);
});

it('returns list of tasks with completedPercentage 100', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getTask('completedPercentage', 100);
    expect(entry[0].completedPercentage).toEqual("100");
});

it('returns list of reviews with taskId or undefined params', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getReviews(undefined);
    const entry1 = await model.getReviews('0');
    expect(entry.length).toBeGreaterThan(0);
    expect(entry1.length).toBeGreaterThan(0);
});

it('returns a review by reviewOutcome gree', async () => {
    const model = await getRoadmapModel();
    const entry = await model.getReview('reviewOutcome', 'Green');
    expect(entry[0].reviewOutcome).toEqual("Green");
});