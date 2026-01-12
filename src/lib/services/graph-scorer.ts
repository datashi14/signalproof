/**
 * SSSP Graph Scoring Module
 * Implementation of the Directed SSSP "Sorting Barrier" for evidence credibility.
 */

export interface GraphNode {
  id: string;
  type: 'claim' | 'evidence' | 'source' | 'time';
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number; // Penalty: Lower weight = more credible/shorter path
  type: 'directness' | 'reputation' | 'contradiction' | 'recency';
}

export interface PathResult {
  totalCost: number;
  evidenceIds: string[];
  explanation: string;
}

/**
 * Implements Dijkstra's algorithm to find the shortest path (minimum credibility cost)
 * from a ClaimNode to available Sources through EvidenceNodes.
 */
export function calculateCredibilityPaths(
  claimId: string,
  nodes: GraphNode[],
  edges: GraphEdge[],
  topK: number = 3
): PathResult[] {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const queue: string[] = [];

  // Initialize
  nodes.forEach(node => {
    distances[node.id] = node.id === claimId ? 0 : Infinity;
    previous[node.id] = null;
    queue.push(node.id);
  });

  while (queue.length > 0) {
    // Pick node with smallest distance
    queue.sort((a, b) => distances[a] - distances[b]);
    const u = queue.shift()!;

    if (distances[u] === Infinity) break;

    // Explore neighbors
    const neighbors = edges.filter(e => e.from === u);
    for (const edge of neighbors) {
      const v = edge.to;
      const alt = distances[u] + edge.weight;
      
      if (alt < distances[v]) {
        distances[v] = alt;
        previous[v] = u;
      }
    }
  }

  // Find all paths reaching a SourceNode
  const sourceNodes = nodes.filter(n => n.type === 'source');
  const results: PathResult[] = sourceNodes
    .map(source => {
      const path: string[] = [];
      let curr: string | null = source.id;
      
      while (curr) {
        path.push(curr);
        curr = previous[curr];
      }
      
      if (path[path.length - 1] !== claimId) return null;

      const reversePath = path.reverse();
      // Filter out only EvidenceNodes for the path result
      const evidenceIds = reversePath
        .map(id => nodes.find(n => n.id === id))
        .filter(n => n?.type === 'evidence')
        .map(n => n!.id);

      return {
        totalCost: distances[source.id],
        evidenceIds,
        explanation: `Path found via ${source.id} with credibility penalty ${distances[source.id].toFixed(2)}`
      };
    })
    .filter((r): r is PathResult => r !== null)
    .sort((a, b) => a.totalCost - b.totalCost)
    .slice(0, topK);

  return results;
}

export const GraphScorerAPI = {
  calculateCredibilityPaths,
};
