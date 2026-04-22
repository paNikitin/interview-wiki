/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Algorithms' | 'Data Structures' | 'System Design' | 'Python Internals';

export interface Complexity {
  time: string;
  space: string;
  worst?: string;
  average?: string;
  best?: string;
}

export interface Topic {
  id: string;
  title: string;
  category: Category;
  description: string;
  content: string;
  complexity?: Complexity;
  code?: string;
  language?: string;
  comparison?: {
    headers: string[];
    rows: string[][];
  };
}
