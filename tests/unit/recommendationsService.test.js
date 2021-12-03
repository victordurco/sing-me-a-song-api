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
    it ('should return false when recommendation dont exists', () => {});

    it ('should return true when recommendation is updated', () => {});
});