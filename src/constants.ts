import { Topic } from './types';

export const TOPICS: Topic[] = [
  // --- ALGORITHMS ---
  {
    id: 'quicksort',
    title: 'Quicksort',
    category: 'Algorithms',
    description: 'Эффективный алгоритм сортировки на основе принципа «разделяй и властвуй».',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      time: 'O(n log n)',
      space: 'O(log n)'
    },
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    language: 'python',
    content: 'Выбирается опорный элемент (pivot), массив делится на две части: меньше и больше пивота. Затем рекурсивно сортируются подмассивы.'
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    category: 'Algorithms',
    description: 'Стабильный алгоритм сортировки с гарантированным временем выполнения.',
    complexity: {
      time: 'O(n log n)',
      space: 'O(n)'
    },
    content: 'Особенности: Стабильность, O(n) доп. памяти. Подходит для внешних сортировок.'
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    category: 'Algorithms',
    description: 'Сортировка вставками. Простой и эффективный для малых или почти отсортированных данных.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      time: 'O(n²)',
      space: 'O(1)'
    },
    content: 'Используется как часть гибридных алгоритмов (например, Timsort).'
  },
  {
    id: 'timsort',
    title: 'Timsort',
    category: 'Algorithms',
    description: 'Гибридный алгоритм сортировки (Merge Sort + Insertion Sort). Стандарт в Python и Java.',
    complexity: {
      best: 'O(n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      time: 'O(n log n)',
      space: 'O(n)'
    },
    content: 'Timsort ищет уже отсортированные последовательности (run) в данных. Если последовательность слишком короткая, она увеличивается с помощью сортировки вставками (Insertion Sort). Затем полученные подмассивы сливаются модифицированным алгоритмом слияния (Merge Sort, с использованием "галопа"). Алгоритм алгоритмически стабилен и сильно оптимизирован для реальных данных, где часто встречаются уже отсортированные последовательности элементов. В Python встроен под капот функций sorted() и метода list.sort().'
  },

  // --- DATA STRUCTURES ---
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    category: 'Data Structures',
    description: 'Линейная структура данных, где элементы связаны указателями.',
    complexity: {
      time: 'O(n) access, O(1) insert at head',
      space: 'O(n)'
    },
    content: 'Singly vs Doubly Linked list. Основное преимущество — константное время вставки/удаления по сравнению с массивом.'
  },
  {
    id: 'avl-tree',
    title: 'AVL Tree',
    category: 'Data Structures',
    description: 'Самобалансирующееся дерево поиска (BST).',
    complexity: {
      time: 'O(log n)',
      space: 'O(n)'
    },
    content: 'Поддерживает баланс так, чтобы разница высот поддеревьев любого узла не превышала 1. Использует малые и большие ротации.'
  },

  // --- PYTHON INTERNALS ---
  {
    id: 'gil',
    title: 'Global Interpreter Lock (GIL)',
    category: 'Python Internals',
    description: 'Механизм, защищающий доступ к объектам Python.',
    content: 'Предотвращает одновременное выполнение байт-кода Python несколькими нативными потоками. Основное влияние на CPU-bound задачи.'
  },
  {
    id: 'concurrency-models',
    title: 'Threading vs Multiprocessing vs Asyncio',
    category: 'Python Internals',
    description: 'Способы конкурентного выполнения кода в Python.',
    comparison: {
      headers: ['Модель', 'Подходит для', 'Влияние GIL'],
      rows: [
        ['Threading', 'I/O-bound задачи', 'Освобождается при I/O'],
        ['Multiprocessing', 'CPU-bound задачи', 'Обход GIL через новый процесс'],
        ['Asyncio', 'Высоконагруженный I/O', 'Однопоточный Event Loop']
      ]
    },
    content: 'Выбор зависит от характера нагрузки: вычисления (CPU) или ожидание (I/O).'
  },
  {
    id: 'slots',
    title: '__slots__',
    category: 'Python Internals',
    description: 'Способ ограничения атрибутов экземпляра для экономии памяти.',
    code: `class Point:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y`,
    language: 'python',
    content: 'Заменяет словарь __dict__ на компактный массив, экономя до 3-4 раз больше памяти на больших объемах объектов.'
  },

  // --- SYSTEM DESIGN ---
  {
    id: 'kafka-vs-rabbitmq',
    title: 'Kafka vs RabbitMQ',
    category: 'System Design',
    description: 'Брокеры сообщений vs Стриминговые платформы.',
    comparison: {
      headers: ['Feature', 'RabbitMQ', 'Kafka'],
      rows: [
        ['Model', 'Push (Smart Broker)', 'Pull (Dumb Broker)'],
        ['Atomicity', 'Single message', 'Batch / Streams'],
        ['Replay', 'No (deleted on ack)', 'Yes (durable log)'],
        ['Latency', 'Low', 'Moderate (batching)']
      ]
    },
    content: 'RabbitMQ — для сложной маршрутизации и очередей задач. Kafka — для Big Data, аналитики и логов.'
  },
  {
    id: 'redis-lua',
    title: 'Redis & Lua Scripts',
    category: 'System Design',
    description: 'Распределенное кэширование и атомарные операции.',
    code: `-- Lua Atomic Delete if matches value
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end`,
    language: 'lua',
    content: 'Lua скрипты выполняются в Redis атомарно, что позволяет реализовать надежные распределенные блокировки (Locking).'
  },
  {
    id: 'sql-vs-nosql',
    title: 'SQL vs NoSQL',
    category: 'System Design',
    description: 'Выбор базы данных.',
    comparison: {
      headers: ['Тип', 'Преимущества', 'Пример'],
      rows: [
        ['SQL (Postgres)', 'ACID, Индексы, Сложные JOIN', 'Финтех, Orders'],
        ['NoSQL (Mongo)', 'Scaling, Flexible Schema', 'Logs, Documents'],
        ['In-Memory (Redis)', 'Speed', 'Cache, Sessions']
      ]
    },
    content: 'SQL базы гарантируют ACID, в то время как NoSQL часто жертвуют консистентностью ради масштабируемости (BASE).'
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'Algorithms',
    description: 'Поиск элемента в отсортированном массиве.',
    complexity: {
      time: 'O(log n)',
      space: 'O(1)'
    },
    code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    language: 'python',
    content: 'Делит область поиска пополам на каждой итерации. Требует отсортированных данных.'
  },
  {
    id: 'bfs',
    title: 'Breadth-First Search (BFS)',
    category: 'Algorithms',
    description: 'Поиск в ширину. Идеально для поиска кратчайшего пути в невзвешенном графе.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    code: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    
    while queue:
        vertex = queue.popleft()
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return visited`,
    language: 'python',
    content: 'Обходит граф слоями (в ширину). Для реализации всегда используется Очередь (Queue). Если граф взвешенный, BFS не гарантирует кратчайший путь (используйте алгоритм Дейкстры).'
  },
  {
    id: 'dfs',
    title: 'Depth-First Search (DFS)',
    category: 'Algorithms',
    description: 'Поиск в глубину. Идеально для топологической сортировки и поиска циклов.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    code: `def dfs(graph, vertex, visited=None):
    if visited is None:
        visited = set()
    visited.add(vertex)
    
    for neighbor in graph[vertex]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited`,
    language: 'python',
    content: 'Идет "вглубь" графа до упора, затем возвращается (Backtracking). Реализуется через рекурсию (Call Stack) или явно через Стек (Stack).'
  },
  {
    id: 'dijkstra',
    title: "Dijkstra's Algorithm",
    category: 'Algorithms',
    description: 'Алгоритм Дейкстры: поиск кратчайшего пути от одной вершины ко всем остальным во взвешенном графе.',
    complexity: {
      time: 'O((V + E) log V)',
      space: 'O(V)'
    },
    code: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        if current_distance > distances[current_node]:
            continue
            
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances`,
    language: 'python',
    content: 'Использует жадный подход и структуру данных мин-куча (Priority Queue). ВАЖНО: не работает с отрицательными весами ребер (для них нужен алгоритм Беллмана-Форда).'
  },
  {
    id: 'heap-sort',
    title: 'Heap Sort',
    category: 'Algorithms',
    description: 'Пирамидальная сортировка. Сортировка in-place на основе структуры данных "Куча" (Heap).',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      time: 'O(n log n)',
      space: 'O(1)'
    },
    content: 'Создает max-heap из массива, затем раз за разом извлекает максимальный элемент и ставит его в конец. Нестабильная сортировка, но, в отличие от QuickSort, гарантирует O(n log n) в худшем случае и не требует O(n) памяти как Merge Sort.'
  },
  {
    id: 'hash-maps',
    title: 'Hash Maps',
    category: 'Data Structures',
    description: 'Структура данных "ключ-значение" с быстрым доступом.',
    complexity: {
      average: 'O(1)',
      worst: 'O(n) (при коллизиях)',
      time: 'O(1)',
      space: 'O(n)'
    },
    content: 'Реализует ассоциативный массив через хэш-функцию. Коллизии решаются методом цепочек или открытой адресацией.'
  },
  {
    id: 'python-gc',
    title: 'Garbage Collection',
    category: 'Python Internals',
    description: 'Управление памятью в Python через Reference Counting и Generational GC.',
    content: 'CPython использует подсчет ссылок как основной механизм. Для поиска циклических ссылок используется дополнительный Garbage Collector, работающий по поколениям (Generations 0, 1, 2).'
  },
  {
    id: 'cap-theorem',
    title: 'CAP Theorem',
    category: 'System Design',
    description: 'Теорема о фундаментальных ограничениях распределенных систем.',
    comparison: {
      headers: ['Свойство', 'Описание'],
      rows: [
        ['Consistency', 'Все узлы видят одни и те же данные'],
        ['Availability', 'Запросы получают ответ даже при сбоях'],
        ['Partition Tolerance', 'Система работает при разрыве связи']
      ]
    },
    content: 'В распределенной системе можно гарантировать только 2 из 3 свойств одновременно.'
  },
  {
    id: 'load-balancing',
    title: 'Load Balancing',
    category: 'System Design',
    description: 'Распределение трафика между серверами.',
    comparison: {
      headers: ['Алгоритм', 'Принцип работы'],
      rows: [
        ['Round Robin', 'По циклу'],
        ['Least Connections', 'Туда, где меньше активных сессий'],
        ['IP Hash', 'Привязка клиента к серверу по IP']
      ]
    },
    content: 'Балансировщики бывают L4 (Транспортный уровень) и L7 (Прикладной уровень, HTTP headers/cookies).'
  }
];
