import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../Home.js';

describe('Home tests', () => {
    it('should contains the heading 1', () => {
    render(<Home />);
        const heading = screen.getByText('FIND AMAZING PRODUCTS BELOW');
        expect(heading).toBeInTheDocument()
    });
});