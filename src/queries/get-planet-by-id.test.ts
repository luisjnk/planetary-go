import { createGetPlanetsURL, getPlanetsBy } from './get-planet-by-id';

jest.mock('./get-planet-by-id', () => ({
	...jest.requireActual('./get-planet-by-id'),
	createGetPlanetsURL: jest.fn(),
}));

describe('Get Planets tests', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should fetch planets successfully', async () => {
		const mockResponse = { count: 1, results: [{ name: 'Earth' }] };
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockResponse),
			})
		) as jest.Mock;

		const params = { searchTerm: 'Earth', pageId: 1 };
		(createGetPlanetsURL as jest.Mock).mockReturnValue('mocked-url');

		const result = await getPlanetsBy(params);
		expect(result).toEqual(mockResponse);
	});

});