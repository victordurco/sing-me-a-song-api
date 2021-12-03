import * as recommendationsService from '../../src/services/recommendationsService.js';
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js'

describe('createRecommendation', () => {
    it ('should return false when name or link already exists', async () => {
        jest.spyOn(recommendationsRepository, "getRecommendationByName").mockImplementationOnce(() => {
            return null;
        });
        jest.spyOn(recommendationsRepository, "getRecommendationByLink").mockImplementationOnce(() => {
            return { id: 8};
        });
        jest.spyOn(recommendationsRepository, "createRecommendation").mockImplementationOnce(() => {
            return [];
        });
        
        const result = await recommendationsService.createRecommendation({name:'teste', link:'http:// youtube.com/lanaDelRey'});
        expect(result).toBeFalsy();
    });

    it ('should return true when name and link are available', async () => {
        jest.spyOn(recommendationsRepository, "getRecommendationByName").mockImplementationOnce(() => {
            return null;
        });
        jest.spyOn(recommendationsRepository, "getRecommendationByLink").mockImplementationOnce(() => {
            return null;
        });
        jest.spyOn(recommendationsRepository, "createRecommendation").mockImplementationOnce(() => {
            return [];
        });
        
        const result = await recommendationsService.createRecommendation({name:'teste', link:'http:// youtube.com/lanaDelRey'});
        expect(result).toBeTruthy();
    });
});

describe('voteRecommendation', () => {
    it ('should return false when recommendation does not exists', async () => {
        jest.spyOn(recommendationsRepository, "upVote").mockImplementationOnce(() => {
            return null;
        });

        const result = await recommendationsService.voteRecommendation({id: 10, type: 'up'});
        expect(result).toBeFalsy();
    });

    it ('should return true when recommendation is updated', async () => {
        jest.spyOn(recommendationsRepository, "downVote").mockImplementationOnce(() => {
            return { id: 10};
        });

        const result = await recommendationsService.voteRecommendation({id: 10, type: 'down'});
        expect(result).toBeTruthy();
    });

    it ('should return true when recommendation is updated and delete if score < -5', async () => {
        jest.spyOn(recommendationsRepository, "downVote").mockImplementationOnce(() => {
            return { id: 10, score: -6};
        });
        jest.spyOn(recommendationsRepository, "deleteRecommendation").mockImplementationOnce(() => {
            return true;
        });

        const result = await recommendationsService.voteRecommendation({id: 10, type: 'down'});
        expect(result).toBeTruthy();
    });
});

describe('getRandom', () => {
    it('should return a high-score recommendation 70% of the times', async () => {
        jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.7);
        jest.spyOn(recommendationsRepository, "getHighScoreRandomRecommendation").mockImplementationOnce(() => {
            return { id: 10};
        });

        const result = await recommendationsService.getRandom();
        expect(result).toBeTruthy();
    });

    it('should return any recommendation when is 70% of the times and there isnt any high-score recommendation', async () => {
        jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.7);
        jest.spyOn(recommendationsRepository, "getHighScoreRandomRecommendation").mockImplementationOnce(() => {
            return null;
        });
        jest.spyOn(recommendationsRepository, "getRandomRecommendation").mockImplementationOnce(() => {
            return { id: 10};
        });

        const result = await recommendationsService.getRandom();
        expect(result).toBeTruthy();
    });

    it('should return a medium-score recommendation 30% of the times', async () => {
        jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.2);
        jest.spyOn(recommendationsRepository, "getMediumScoreRandomRecommendation").mockImplementationOnce(() => {
            return { id: 10};
        });

        const result = await recommendationsService.getRandom();
        expect(result).toBeTruthy();
    });

    it('should return any recommendation when is 30% of the times and there isnt any medium-score recommendation', async () => {
        jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.2);
        jest.spyOn(recommendationsRepository, "getMediumScoreRandomRecommendation").mockImplementationOnce(() => {
            return null;
        });
        jest.spyOn(recommendationsRepository, "getRandomRecommendation").mockImplementationOnce(() => {
            return { id: 10};
        });

        const result = await recommendationsService.getRandom();
        expect(result).toBeTruthy();
    });
});

describe('getTops', () => {
    it('should return a list of recommendations', async ()=> {
        jest.spyOn(recommendationsRepository, "getTops").mockImplementationOnce(() => {
            return [
                { id: 10},
                {id: 20}
            ];
        });

        const result = await recommendationsService.getTops(2);
        expect(result.length).toBe(2);
    });
});