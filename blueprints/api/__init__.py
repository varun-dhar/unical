import sanic

from . import courses

__all__ = ['group']

group = sanic.Blueprint.group(courses.bp)
