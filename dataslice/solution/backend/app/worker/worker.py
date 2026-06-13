"""A small in-process periodic worker. Schedule background work here;
do not introduce a second scheduler or job framework."""
import time
from dataclasses import dataclass
from typing import Callable


@dataclass
class Job:
    name: str
    func: Callable[[], None]
    interval_seconds: int
    _last_run: float = 0.0


class Worker:
    def __init__(self):
        self._jobs: list[Job] = []

    def register_periodic(self, name: str, func: Callable[[], None], interval_seconds: int) -> None:
        self._jobs.append(Job(name=name, func=func, interval_seconds=interval_seconds))

    def run_due(self, now: float | None = None) -> None:
        """Run every job whose interval has elapsed. Called by run() and
        directly in tests."""
        now = time.time() if now is None else now
        for job in self._jobs:
            if now - job._last_run >= job.interval_seconds:
                job.func()
                job._last_run = now

    def run(self, tick_seconds: int = 5) -> None:  # pragma: no cover
        while True:
            self.run_due()
            time.sleep(tick_seconds)


worker = Worker()
